// menu.js
// Handles rendering of hierarchical menu structure with categories

(function() {
  const menu = document.getElementById('dap-extension-menu');

  if (!menu) return;

  function createMenuItem(item, onClick) {
    const li = document.createElement('li');
    li.className = 'dap-menu-item';
    li.setAttribute('role', 'menuitem');
    li.textContent = item.label;
    li.addEventListener('click', (e) => {
      e.stopPropagation();
      const menuButton = document.getElementById('dap-extension-icon');
      menuButton.click();
      onClick(item);
    });
    return li;
  }

  function createCategorySection(category, items, onClick) {
    const section = document.createElement('div');
    section.className = 'dap-menu-category'; // Start collapsed (no 'expanded' class)
  
    const header = document.createElement('div');
    header.className = 'dap-category-header';
    
    const icon = document.createElement('span');
    icon.className = 'dap-category-icon';
    icon.textContent = category.icon || '📁';
    
    const label = document.createElement('span');
    label.className = 'dap-category-label';
    label.textContent = category.label;
    
    const toggle = document.createElement('span');
    toggle.className = 'dap-category-toggle';
    toggle.textContent = '▶'; // Right arrow for collapsed state
    
    // Add click handler for expand/collapse
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      section.classList.toggle('expanded');
    });
    
    header.appendChild(icon);
    header.appendChild(label);
    header.appendChild(toggle);
    section.appendChild(header);
  
    const list = document.createElement('ul');
    list.className = 'dap-category-list';
    list.setAttribute('role', 'menu');
  
    items.forEach(item => {
      const li = createMenuItem(item, onClick);
      li.className += ' dap-category-item';
      list.appendChild(li);
    });
  
    section.appendChild(list);
    return section;
  }

  function createMainSection(title, categories, items, onClick) {
    const section = document.createElement('div');
    section.className = 'dap-main-section';
  
    const header = document.createElement('h4');
    header.className = 'dap-main-header';
    header.textContent = title;
    section.appendChild(header);

    // Sort categories by order
    const sortedCategories = categories.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    // Create category sections
    sortedCategories.forEach(category => {
      const categoryItems = items.filter(item => item.parent === category.id);
      if (categoryItems.length > 0) {
        const categorySection = createCategorySection(category, categoryItems, onClick);
        section.appendChild(categorySection);
      }
    });

    // Add items without parent to "Other" category
    const orphanItems = items.filter(item => !item.parent || !categories.find(c => c.id === item.parent));
    if (orphanItems.length > 0) {
      const otherCategory = {
        id: 'other',
        label: 'Autres',
        icon: '📂',
        order: 999
      };
      const otherSection = createCategorySection(otherCategory, orphanItems, onClick);
      section.appendChild(otherSection);
    }
  
    return section;
  }

  async function loadTourMenus() {
    try {
      // Expect a single path configured in init.js
      const toursPath = (window.DAP_TOURS_PATH && typeof window.DAP_TOURS_PATH === 'string') ? window.DAP_TOURS_PATH : null;
      if (!toursPath) {
        throw new Error('DAP Extension: window.DAP_TOURS_PATH must be set to a valid URL in init.js');
      }

      // Use background service worker to fetch the JSON (avoids CORS/file:// issues)
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        const result = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ type: 'fetchJson', url: toursPath }, resolve);
        });
        if (result && result.success && typeof result.text === 'string') {
          const config = JSON.parse(result.text);
          return config.menus || [];
        } else {
          throw new Error(result && result.error ? result.error : 'Background fetch failed');
        }
      } else {
        throw new Error('DAP Extension: chrome.runtime messaging unavailable for background fetch');
      }
    } catch (error) {
      console.error('DAP Extension: Error loading tour menus:', error);
      return [];
    }
  }

  async function renderMenu() {
    menu.innerHTML = "";

    // Load tour menus from config
    const tourMenus = await loadTourMenus();
    
    // Get script menus from global registry
    const scriptMenus = window.DAP_MENUS || [];
    
    // Combine all menus and deduplicate
    const allMenus = [...tourMenus, ...scriptMenus];
    const uniqueMenus = allMenus.reduce((acc, menu) => {
      if (!acc.find(m => m.id === menu.id)) {
        acc.push(menu);
      }
      return acc;
    }, []);

    // Create Quick Help section with tour categories
    const tourSection = createMainSection(
      'Quick Help',
      tourMenus,
      (window.DAP_TOURS || []),
      tour => {
        if (window.DAPExtension?.onTourStart) {
          window.DAPExtension.onTourStart(tour);
        }
        tour.start();
      }
    );

    // Create Quick Actions section with action categories
    const actionSection = createMainSection(
      'Quick Actions',
      scriptMenus,
      (window.DAP_ACTIONS || []),
      action => {
        if (window.DAPExtension?.onActionRun) {
          window.DAPExtension.onActionRun(action);
        }
        action.run();
      }
    );

    menu.appendChild(tourSection);
    menu.appendChild(actionSection);
  }

  // Render initially and whenever window arrays update
  renderMenu();
  window.addEventListener('dap-update-menu', renderMenu);
})();