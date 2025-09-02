// focus-mode.js
// Dims the page and highlights the main content area

(function() {
  if (!window.DAP_ACTIONS) window.DAP_ACTIONS = [];

  function focusMode() {
    const $overlay = $('#dap-focus-overlay');
    if ($overlay.length) {
      $overlay.remove();
    } else {
      const $overlayNew = $('<div id="dap-focus-overlay"></div>').css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.7)',
        'z-index': 999998,
        'pointer-events': 'none'
      });
      $('body').append($overlayNew);
      setTimeout(() => $overlayNew.remove(), 5000);
    }
  }

  // Define menu structure if not exists
  if (!window.DAP_MENUS) window.DAP_MENUS = [];
  
  // Register menus (only once)
  const prodMenuExists = window.DAP_MENUS.find(m => m.id === 'productivity-tools');
  if (!prodMenuExists) {
    window.DAP_MENUS.push({
      id: 'productivity-tools',
      label: 'Productivity',
      icon: '⚡',
      order: 4
    });
  }

  // Register the action
  window.DAP_ACTIONS.push({
    id: 'focus-mode',
    label: 'Focus Mode',
    description: 'Dims the page and highlights the main content area',
    category: 'productivity',
    parent: 'productivity-tools',
    run: focusMode
  });
})();