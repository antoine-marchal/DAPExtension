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
})();