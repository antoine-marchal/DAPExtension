// tour1.js
// Example Shepherd.js tour

(function() {
  if (!window.DAP_TOURS) window.DAP_TOURS = [];

  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      classes: 'shepherd-theme-arrows',
      scrollTo: true
    }
  });

  tour.addStep({
    id: 'welcome',
    text: 'Welcome to Example.com!',
    attachTo: {
      element: 'body',
      on: 'center'
    },
    buttons: [
      {
        text: 'Next',
        action: tour.next
      }
    ]
  });

  window.DAP_TOURS.push({
    label: 'Welcome Tour 2',
    start: () => tour.start()
  });

  // Trigger menu update
  window.dispatchEvent(new Event('dap-update-menu'));
})();