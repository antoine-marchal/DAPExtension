// action1.js
// Example quick action: highlight all paragraphs

(function() {
  if (!window.DAP_ACTIONS) window.DAP_ACTIONS = [];

  function highlightParagraphs() {
    document.querySelectorAll('p').forEach(p => {
      p.style.backgroundColor = 'yellow';
    });
  }

  window.DAP_ACTIONS.push({
    label: 'Highlight Paragraphs',
    run: highlightParagraphs
  });

  // Trigger menu update
  window.dispatchEvent(new Event('dap-update-menu'));
})();