// highlight-paragraphs.js
// Highlights all paragraph elements on the page

(function() {
  if (!window.DAP_ACTIONS) window.DAP_ACTIONS = [];

  function highlightParagraphs() {
    document.querySelectorAll('p').forEach(p => {
      p.style.backgroundColor = 'yellow';
      p.style.transition = 'background-color 0.3s ease';
    });
    showNotification('Paragraphs highlighted successfully', 'success');
  }

  // Define menu structure if not exists
  if (!window.DAP_MENUS) window.DAP_MENUS = [];
  
  // Register menus (only once)
  const visualMenuExists = window.DAP_MENUS.find(m => m.id === 'visual-tools');
  if (!visualMenuExists) {
    window.DAP_MENUS.push({
      id: 'visual-tools',
      label: 'Visual Tools',
      icon: '🎨',
      order: 1
    });
  }

  // Register the action
  window.DAP_ACTIONS.push({
    id: 'highlight-paragraphs',
    label: 'Highlight Paragraphs',
    description: 'Highlights all paragraph elements on the page with a yellow background',
    category: 'visual',
    parent: 'visual-tools',
    run: highlightParagraphs
  });

})();