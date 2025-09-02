// tour-loader.js
// Dynamic tour loader from simplified JSON configuration

(async function() {
  if (!window.DAP_TOURS) window.DAP_TOURS = [];
  
  try {
    // Load tours configuration (supports window.DAP_TOURS_PATHS array or window.DAP_TOURS_PATH string)
    let toursConfig;
    const defaultToursPath = chrome.runtime.getURL('config/tours.json');

    // Helper: fetch and parse JSON, throwing on non-OK.
    // Attempts a direct fetch first; if that fails due to CORS or the URL is file://,
    // it will ask the extension background service worker to fetch the resource.
    async function tryFetchJson(url) {
      // Fast path: try direct fetch (works for http/https and extension/resource URLs)
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Failed to fetch ${url}: ${resp.status} ${resp.statusText}`);
        return await resp.json();
      } catch (err) {
        // For file:// or CORS-restricted URLs, fall back to background fetch via chrome.runtime
        try {
          if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
            const result = await new Promise((resolve) => {
              chrome.runtime.sendMessage({ type: 'fetchJson', url }, resolve);
            });
            if (result && result.success && typeof result.text === 'string') {
              return JSON.parse(result.text);
            } else {
              throw new Error(result && result.error ? result.error : 'Background fetch failed');
            }
          }
        } catch (bgErr) {
          // Re-throw original fetch error if background fetch isn't available or also failed
          throw err;
        }
        // If no background messaging available, rethrow original error
        throw err;
      }
    }

    // Load tours configuration from a single required path set in init.js via window.DAP_TOURS_PATH.
    // This loader will perform the fetch via the extension background service worker to avoid CORS
    // and file:// restrictions. No fallback to packaged config and no multi-path support.
    const toursPath = (window.DAP_TOURS_PATH && typeof window.DAP_TOURS_PATH === 'string') ? window.DAP_TOURS_PATH : null;
    if (!toursPath) {
      throw new Error('DAP Extension: window.DAP_TOURS_PATH must be set to a single file:// or http(s) URL in init.js');
    }

    try {
      // Use background fetch (chrome.runtime) exclusively for the configured path
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        const result = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ type: 'fetchJson', url: toursPath }, resolve);
        });
        if (result && result.success && typeof result.text === 'string') {
          toursConfig = JSON.parse(result.text);
          console.info('DAP Extension: Loaded tours from (background)', toursPath);
        } else {
          throw new Error(result && result.error ? result.error : 'Background fetch failed');
        }
      } else {
        throw new Error('DAP Extension: chrome.runtime messaging unavailable for background fetch');
      }
    } catch (err) {
      // Surface the error to the outer catch
      throw err;
    }

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