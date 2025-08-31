// tour-loader.js
// Dynamic tour loader from simplified JSON configuration

(async function() {
  if (!window.DAP_TOURS) window.DAP_TOURS = [];

  try {
    // Load tours configuration
    const toursResponse = await fetch(chrome.runtime.getURL('config/tours.json'));
    const toursConfig = await toursResponse.json();

    // Default tour options
    const defaultOptions = {
      scrollTo: false,
      popperOptions: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 65]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              padding: 20
            }
          }
        ]
      }
    };

    // Create tours from simplified configuration
    toursConfig.tours.forEach((tourConfig, index) => {
      const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
          classes: 'shepherd-theme-arrows',
          ...defaultOptions
        }
      });

      // Add steps to the tour
      tourConfig.steps.forEach((stepConfig, stepIndex) => {
        const stepOptions = {
          title: stepConfig.title,
          text: stepConfig.text,
          buttons: []
        };

        // Handle element attachment - simplified format
        if (stepConfig.element && stepConfig.element !== 'body') {
          stepOptions.attachTo = {
            element: stepConfig.element,
            on: stepConfig.position || 'bottom'
          };
        }

        // Auto-generate appropriate buttons based on step position
        const isLastStep = stepIndex === tourConfig.steps.length - 1;
        const isFirstStep = stepIndex === 0;

        if (!isFirstStep) {
          stepOptions.buttons.push({
            text: 'Back',
            action: tour.back,
            classes: ''
          });
        }

        if (isLastStep) {
          stepOptions.buttons.push({
            text: 'Complete',
            action: tour.complete,
            classes: 'shepherd-button-secondary'
          });
        } else {
          stepOptions.buttons.push({
            text: 'Next',
            action: tour.next,
            classes: 'shepherd-button-secondary'
          });
        }

        tour.addStep(stepOptions);
      });

      // Register the tour with auto-generated ID
      window.DAP_TOURS.push({
        id: tourConfig.id || `tour-${index}`,
        label: tourConfig.label,
        description: tourConfig.description || '',
        parent: tourConfig.parent,
        start: () => tour.start()
      });
    });

    console.log(`DAP Extension: Loaded ${toursConfig.tours.length} tours from configuration`);
    
    // Trigger menu update
    window.dispatchEvent(new Event('dap-update-menu'));

  } catch (error) {
    console.error('DAP Extension: Error loading tours configuration:', error);
  }
})();