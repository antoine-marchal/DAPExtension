// toggle-images.js
// Show or hide all images on the page

(function() {
  if (!window.DAP_ACTIONS) window.DAP_ACTIONS = [];

  function toggleImages() {
    const images = document.querySelectorAll('img');
    const isHidden = images[0]?.style.display === 'none';
    images.forEach(img => {
      img.style.display = isHidden ? '' : 'none';
    });
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
    id: 'toggle-images',
    label: 'Toggle Images',
    description: 'Show or hide all images on the page',
    category: 'visual',
    parent: 'visual-tools',
    run: toggleImages
  });
})();