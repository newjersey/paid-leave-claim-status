import 'uswds/css/uswds.css';

import {
  setupAnalytics,
} from "../modules/shared.mjs";

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

function executeOverride() {
  setupAnalytics();
  makeLinkAccessible();
  applyFont();
}

function makeLinkAccessible() {
  const link = document.getElementById('lnkFake');
  if (link) {
    link.setAttribute('aria-hidden', 'true');
    link.setAttribute('tabindex', '-1');
  }
}

function applyFont() {
  document.body.style.fontFamily = '"Public Sans", sans-serif';
}
