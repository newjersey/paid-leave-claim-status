import { applyFooter } from "./footer.js";
import { replaceHeader } from "./header.js";

export function globalDesignChanges(pageId) {
  addViewportMetaTag();
  replaceHeader(pageId);
  applyFooter(pageId);
  injectGlobalStyles();
  styleButtons();
}

function addViewportMetaTag() {
  const metaTag = document.createElement('meta');
  metaTag.name = 'viewport';
  metaTag.content = 'width=device-width, initial-scale=1.0';
  document.head.appendChild(metaTag);
}

function injectGlobalStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      background-color: #FBFCFD;
    }
    h1, h2, h3, h4, p, a {
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

    form .ajax__tab_xp .ajax__tab_body {
      border: none;
    }

    form {
      color: black;
      margin-left: 142px;
      margin-right: 142px;
    }

    @media (max-width: 767px) {
      form {
        margin-left: 20px;
        margin-right: 20px;
      }

      .usa-button {
        min-height: 40px;
        width: 100%;
      }

      div {
        max-width: 100%;
      }

      fieldset {
        width: auto;
        max-width: 100%;
      }

      table {
        width: 100%;
        table-layout: auto;
      }
        
      input[type="text"], select, textarea {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }
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

// TODO: this only styles the buttons.
// When possible also use USWDS suggested HTML fieldset and legend structure
export function styleRadioButton(radioButtonId, marginBottom = false) {
  const radioButton = document.getElementById(radioButtonId);
  const label = document.querySelector(`label[for="${radioButtonId}"]`);

  if (radioButton && label) {
    const radioDiv = document.createElement('div');
    radioDiv.classList.add('usa-radio');

    radioButton.classList.add('usa-radio__input');
    label.classList.add('usa-radio__label');
    label.style.marginBottom = marginBottom ? '20px': '0';
    label.style.textAlign = 'left';

    radioDiv.appendChild(radioButton.cloneNode(true));
    radioDiv.appendChild(label.cloneNode(true));

    radioButton.parentNode.insertBefore(radioDiv, radioButton);

    radioButton.remove();
    label.remove();
  }
}
