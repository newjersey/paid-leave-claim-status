
import { applyFooter } from "./footer.js";
import { replaceHeader } from "./header.js";

export function globalDesignChanges(pageId) {
  replaceHeader();
  applyFooter(pageId);
  injectGlobalStyles();
  styleButtons();
}

function injectGlobalStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      background-color: #FBFCFD;
    }
    h1, h2, h3, h4, p, .ajax__tab_xp .ajax__tab_body {
      font-family: "Public Sans", sans-serif;
      font-variant: normal;
    }
    .ajax__tab_panel {
      font-family: "Public Sans", sans-serif !important;
      font-variant: normal !important;
      font-size: 16px !important;
    }
    .usa-button {
      padding: 0 1.25rem;
      width: auto;
    }
    .usa-button.btnConfirm {
      width: auto;
    }
  `;
  document.head.appendChild(style);
}

function styleButtons() {
  document.querySelectorAll('button, input[type="submit"]').forEach(button => {
    button.classList.add('usa-button');
    button.style.width = null;
    button.style.height = null;
  });
}
