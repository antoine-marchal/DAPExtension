// content.js
// Injects the floating icon and handles menu interactions

(function() {
  // Create floating icon
  const icon = document.createElement('img');
  icon.src = chrome.runtime.getURL('ui/icon.png');
  icon.id = 'dap-extension-icon';
  icon.alt = 'Help';
  icon.setAttribute('role', 'button');
  icon.style.position = 'fixed';
  icon.style.bottom = '20px';
  icon.style.right = '20px';
  icon.style.width = '48px';
  icon.style.height = '48px';
  icon.style.cursor = 'pointer';
  icon.style.zIndex = '999999';
  document.body.appendChild(icon);

  // Create menu container
  const menu = document.createElement('div');
  menu.id = 'dap-extension-menu';
  menu.style.display = 'none';
  document.body.appendChild(menu);

  // Load menu logic
  // (Now menu.js is included as content script in manifest.json, so no need to inject here)

  // Toggle menu
  icon.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    if (menu.style.display === 'block' && window.DAPExtension?.onMenuOpen) {
      window.DAPExtension.onMenuOpen();
    }
  });
})();