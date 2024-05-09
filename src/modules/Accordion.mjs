/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   Simple accordion pattern, taken from https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
 */

"use strict";

import { logEvent, ICON_BASE_URL } from "./shared.mjs";

export class Accordion {
  constructor(domNode) {
    this.rootEl = domNode;
    this.buttonEl = this.rootEl.querySelector("button[aria-expanded]");
    this.iconEl = this.rootEl.querySelector("img");

    const controlsId = this.buttonEl.getAttribute("aria-controls");
    this.contentEl = document.getElementById(controlsId);

    this.open = this.buttonEl.getAttribute("aria-expanded") === "true";

    // add event listeners
    this.buttonEl.addEventListener("click", this.onButtonClick.bind(this));
  }

  onButtonClick() {
    this.toggle(!this.open);
  }

  toggle(open) {
    // don't do anything if the open state doesn't change
    if (open === this.open) {
      return;
    }

    // update the internal state
    this.open = open;

    // handle DOM updates
    this.buttonEl.setAttribute("aria-expanded", `${open}`);
    if (open) {
      this.contentEl.removeAttribute("hidden");
      this.iconEl.src = `${ICON_BASE_URL}/remove.svg`;
      this.iconEl.alt = "See less";
      logEvent(
        "[DOL_DABI] Opened Claim Detail form accordion",
        this.rootEl.dataset.logKey
      );
    } else {
      this.contentEl.setAttribute("hidden", "");
      this.iconEl.src = `${ICON_BASE_URL}/add.svg`;
      this.iconEl.alt = "See more";
    }
  }

  // Add public open and close methods for convenience
  open() {
    this.toggle(true);
  }

  close() {
    this.toggle(false);
  }
}
