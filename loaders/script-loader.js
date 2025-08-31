// script-loader.js
// Scripts now self-register as actions, provides shared notification system

(function() {
  // Global notification function (shared across all scripts)
  if (!window.showNotification) {
    window.showNotification = function(message, type = 'info') {
      // Remove existing notifications
      const existingNotification = document.querySelector('#dap-notification');
      if (existingNotification) {
        existingNotification.remove();
      }

      // Create notification element
      const notification = document.createElement('div');
      notification.id = 'dap-notification';
      notification.textContent = message;
      
      // Style the notification
      const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        z-index: 999999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        animation: dapSlideIn 0.3s ease-out;
      `;

      // Add animation keyframes if not already present
      if (!document.querySelector('#dap-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'dap-notification-styles';
        style.textContent = `
          @keyframes dapSlideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes dapSlideOut {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100%);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      // Add to page
      document.body.appendChild(notification);

      // Auto-remove after 3 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.style.animation = 'dapSlideOut 0.3s ease-in';
          setTimeout(() => {
            notification.remove();
          }, 300);
        }
      }, 3000);
    };
  }

  // Wait for scripts to be loaded and register themselves
  setTimeout(() => {
    console.log(`DAP Extension: Scripts have self-registered as actions`);
    
    // Trigger menu update after scripts have loaded
    window.dispatchEvent(new Event('dap-update-menu'));
  }, 100);
})();