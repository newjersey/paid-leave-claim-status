
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
    #ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment {
      font-family: "Public Sans", sans-serif;
      font-variant: normal;
      font-size: 16pt;
    }
    .usa-button {
      padding: 0 1.25rem;
    }
  `;
  document.head.appendChild(style);
}

function styleButtons() {
  document.querySelectorAll('button, input[type="submit"]').forEach(button => {
    button.classList.add('usa-button');
  });
}
