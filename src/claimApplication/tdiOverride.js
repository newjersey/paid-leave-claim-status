import 'uswds/css/uswds.css';

import {
  setupAnalytics,
} from "../modules/shared.mjs";
import { loginProfileLabels } from './loginProfile.js';

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
  accessibilityContrast();
  accessibilityLabels();
  applyFont();
}

function makeLinkAccessible() {
  const link = document.getElementById('lnkFake');
  if (link) {
    link.setAttribute('aria-hidden', 'true');
    link.setAttribute('tabindex', '-1');
  }
}

function accessibilityContrast() {
  document.querySelectorAll('*').forEach(element => {
    const computedStyle = window.getComputedStyle(element);
    const color = computedStyle.color;

    if (color === 'rgb(128, 128, 128)' || color.toLowerCase() === 'gray') {
      element.style.color = 'black';
    }
  });
}

function accessibilityLabels () {
  const labels = [
    ...loginProfileLabels,
  ];

  labels.forEach(({ id, label }) => {
    const element = document.getElementById(id);
    if (element && !element.hasAttribute('aria-label')) {
      element.setAttribute('aria-label', label);
    }
  });
}

function applyFont() {
  document.body.style.fontFamily = '"Public Sans", sans-serif';
  document.querySelectorAll('*').forEach(element => {
    element.style.fontFamily = '"Public Sans", sans-serif';
  });
}
