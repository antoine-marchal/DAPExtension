// scroll-to-top.js
// Smoothly scrolls the page to the top

(function() {
  if (!window.DAP_ACTIONS) window.DAP_ACTIONS = [];

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Define menu structure if not exists
  if (!window.DAP_MENUS) window.DAP_MENUS = [];
  
  // Register menus (only once)
  const navMenuExists = window.DAP_MENUS.find(m => m.id === 'navigation-tools');
  if (!navMenuExists) {
    window.DAP_MENUS.push({
      id: 'navigation-tools',
      label: 'Navigation',
      icon: '🧭',
      order: 3
    });
  }

  // Register the action
  window.DAP_ACTIONS.push({
    id: 'scroll-to-top',
    label: 'Scroll to Top',
    description: 'Smoothly scrolls the page to the top',
    category: 'navigation',
    parent: 'navigation-tools',
    run: scrollToTop
  });
})();