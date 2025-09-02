// init.js
// Entry point for customizing the DAP Extension

(function() {
  console.log("DAP Extension initialized");
  // Global customization hooks
  window.DAPExtension = {
    onMenuOpen: null,   // hook for when menu opens
    onActionRun: null,  // hook for when action executes
    onTourStart: null   // hook for when tour starts
  };
// Helpers to configure where tours are loaded from
window.DAP_TOURS_PATH = window.DAP_TOURS_PATH || null;

/**
 * Set a single tours path (string). This clears any previously set DAP_TOURS_PATHS.
 * Example: window.setDapToursPath('file:///C:/path/to/tours.json')
 */
window.setDapToursPath = function(path) {
  if (typeof path !== 'string') throw new TypeError('path must be a string');
  window.DAP_TOURS_PATH = path;
  window.DAP_TOURS_PATHS = [];
  console.info('DAP Extension: set DAP_TOURS_PATH ->', path);
};


window.setDapToursPath('file://C:/Workspace/DAPExtension/config/test.json');
})();