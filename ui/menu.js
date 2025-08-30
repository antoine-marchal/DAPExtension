// menu.js
// Handles rendering of the Quick Help and Quick Actions submenus

(function() {
  const menu = document.getElementById('dap-extension-menu');

  if (!menu) return;

  function createSection(title, items, onClick) {
    const menuButton = document.getElementById('dap-extension-icon');
    const section = document.createElement('div');
    section.className = 'dap-menu-section';
  
    const header = document.createElement('h4');
    header.className = 'dap-menu-header';
    header.textContent = title;
    section.appendChild(header);
  
    const list = document.createElement('ul');
    list.className = 'dap-menu-list';
    list.setAttribute('role', 'menu');
  
    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'dap-menu-item';
      li.setAttribute('role', 'menuitem');
      li.textContent = item.label;
      li.addEventListener('click', () => {
        menuButton.click();
        onClick(item);
    });
      list.appendChild(li);
    });
  
    section.appendChild(list);
    return section;
  }

  function renderMenu() {
    menu.innerHTML = "";

    const quickHelpSection = createSection(
      'Quick Help',
      (window.DAP_TOURS || []),
      tour => {
        if (window.DAPExtension?.onTourStart) {
          window.DAPExtension.onTourStart(tour);
        }
        tour.start();
      }
    );

    const quickActionSection = createSection(
      'Quick Actions',
      (window.DAP_ACTIONS || []),
      action => {
        if (window.DAPExtension?.onActionRun) {
          window.DAPExtension.onActionRun(action);
        }
        action.run();
      }
    );

    menu.appendChild(quickHelpSection);
    menu.appendChild(quickActionSection);
  }

  // Render initially and whenever window arrays update
  renderMenu();
  window.addEventListener('dap-update-menu', renderMenu);
})();