// scripts/show-paris-time.js
// Action: fetch current time in Europe/Paris and show in a modal window
(function() {
  // Ensure actions registry
  window.DAP_ACTIONS = window.DAP_ACTIONS || [];

  // Helper: show modal with title and HTML content
  function showModal(title, htmlContent) {
    // Remove existing modal
    const existing = document.getElementById('dap-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'dap-modal';
    overlay.style.cssText = [
      'position: fixed',
      'inset: 0',
      'display: flex',
      'align-items: center',
      'justify-content: center',
      'background: rgba(0,0,0,0.5)',
      'z-index: 1000000'
    ].join(';');

    const modal = document.createElement('div');
    modal.style.cssText = [
      'min-width: 320px',
      'max-width: 90%',
      'background: white',
      'border-radius: 8px',
      'padding: 18px',
      'box-shadow: 0 10px 30px rgba(0,0,0,0.2)',
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      'color: #111'
    ].join(';');

    const h = document.createElement('h3');
    h.textContent = title;
    h.style.margin = '0 0 12px 0';

    const content = document.createElement('div');
    content.innerHTML = htmlContent;

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'margin-top:12px; text-align:right;';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = [
      'padding:8px 12px',
      'border-radius:6px',
      'border:none',
      'background:#2563eb',
      'color:white',
      'cursor:pointer',
      'font-size:14px'
    ].join(';');
    closeBtn.addEventListener('click', () => overlay.remove());

    btnRow.appendChild(closeBtn);
    modal.appendChild(h);
    modal.appendChild(content);
    modal.appendChild(btnRow);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  // Helper: fetch via background service worker if direct fetch fails or is disallowed
  async function privilegedFetchText(url) {
    // try direct fetch first
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      return await resp.text();
    } catch (err) {
      // fallback to background fetch via chrome.runtime
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        const result = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ type: 'fetchJson', url }, resolve);
        });
        if (result && result.success && typeof result.text === 'string') {
          return result.text;
        }
        throw new Error(result && result.error ? result.error : 'Background fetch failed');
      }
      throw err;
    }
  }

  // The action implementation
  const action = {
    id: 'show-paris-time',
    label: 'Show Paris Time',
    description: 'Fetch current time in Paris (Europe/Paris) and display it.',
    async run() {
      try {
        const apiUrl = 'https://worldtimeapi.org/api/timezone/Europe/Paris';
        const text = await privilegedFetchText(apiUrl);
        const data = JSON.parse(text);
        // data.datetime example: '2025-09-02T21:00:00.123456+02:00'
        const dt = data.datetime || data.utc_datetime || null;
        const timezone = data.timezone || 'Europe/Paris';
        let human = '';
        if (dt) {
          // Format datetime into a nice display
          const d = new Date(dt);
          human = d.toLocaleString('en-GB', { timeZone: timezone, hour12: false, dateStyle: 'medium', timeStyle: 'medium' });
        } else if (data.unixtime) {
          const d = new Date(data.unixtime * 1000);
          human = d.toLocaleString('en-GB', { timeZone: 'Europe/Paris' });
        } else {
          human = JSON.stringify(data);
        }

        showModal('Current time — Paris', '<p style="margin:0 0 8px 0">Timezone: <strong>' + timezone + '</strong></p>' +
          '<p style="margin:0 0 8px 0">Time: <strong>' + human + '</strong></p>' +
          '<pre style="white-space:pre-wrap; font-size:12px; color:#444; margin-top:8px;">' + (data.datetime || '') + '</pre>');
      } catch (err) {
        console.error('Show Paris Time action failed', err);
        showModal('Current time — Paris', '<p style="color:#b91c1c">Failed to fetch time: ' + String(err) + '</p>');
      }
    }
  };

  // Register the action so ui/menu.js can list it
  window.DAP_ACTIONS = window.DAP_ACTIONS || [];
  // avoid duplicates
  if (!window.DAP_ACTIONS.find(a => a.id === action.id)) {
    window.DAP_ACTIONS.push(action);
  }
})();