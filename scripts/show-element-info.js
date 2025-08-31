// show-element-info.js
// Display information about elements when hovering over them

(function() {
  if (!window.DAP_ACTIONS) window.DAP_ACTIONS = [];

  function showElementInfo() {
    let infoDiv = null;
    
    // Remove existing listener if any
    if (window.dapElementInfoListener) {
      document.removeEventListener('mouseover', window.dapElementInfoListener);
      showNotification('Element info disabled', 'info');
      return;
    }
    
    // Create new listener
    window.dapElementInfoListener = function(e) {
      if (infoDiv) infoDiv.remove();
      infoDiv = document.createElement('div');
      infoDiv.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #2563eb; color: white; padding: 8px 12px; border-radius: 6px; font-size: 12px; z-index: 999999; font-family: monospace;';
      infoDiv.textContent = `${e.target.tagName.toLowerCase()}${e.target.className ? '.' + e.target.className.split(' ')[0] : ''}${e.target.id ? '#' + e.target.id : ''}`;
      document.body.appendChild(infoDiv);
    };
    
    document.addEventListener('mouseover', window.dapElementInfoListener);
    showNotification('Element info enabled - hover over elements', 'success');
  }

  // Define menu structure if not exists
  if (!window.DAP_MENUS) window.DAP_MENUS = [];
  
  // Register menus (only once)
  const debugMenuExists = window.DAP_MENUS.find(m => m.id === 'debug-tools');
  if (!debugMenuExists) {
    window.DAP_MENUS.push({
      id: 'debug-tools',
      label: 'Debug Tools',
      icon: '🔍',
      order: 2
    });
  }

  // Register the action
  window.DAP_ACTIONS.push({
    id: 'show-element-info',
    label: 'Show Element Info',
    description: 'Display information about elements when hovering over them',
    category: 'debug',
    parent: 'debug-tools',
    run: showElementInfo
  });
})();