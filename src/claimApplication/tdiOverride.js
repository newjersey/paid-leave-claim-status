import { logEvent, setupAnalytics } from "../modules/shared.mjs";
import { accessibilityChanges } from './accessibility.js';
import { identifyPage } from './identifyPage.js';

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

function executeOverride() {
  setupAnalytics();

  const pageId = identifyPage();
  if (pageId === 'other') {
    return; // do not apply any other changes
  }

  accessibilityChanges();
  logEvent(`${pageId} viewed`, {});
  trackHelpClicks(pageId);
}

function trackHelpClicks(pageId) {
  const helpLink = document.getElementById('header_lbtnShowFAQ');
  if (helpLink) {
    helpLink.addEventListener('click', function() {
      logEvent('Help Clicked', { pageId });
    });
  }
}
