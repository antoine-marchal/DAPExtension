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
    arrow: { padding: 10 },
    title: 'Welcome to DAP!',
    text: 'This is a plus button.',
    attachTo: {
      element: 'span.fonticon-plus',
      on: 'right'
    },
    buttons: [
      {
        text: 'Suivant',
        action: tour.next
      }
    ]
  });
  tour.addStep({
    id: 'welcome2',
    arrow: { padding: 10 },
    text: 'This is to create a comment.',
    attachTo: {
      element: 'p.ck-placeholder',
      on: 'right'
    },
    buttons: [
      {
        text: 'Next',
        action: tour.next
      }
    ]
  });
  window.DAP_TOURS.push({
    label: 'Welcome Tour',
    start: () => tour.start()
  });

  // Trigger menu update
  window.dispatchEvent(new Event('dap-update-menu'));
})();