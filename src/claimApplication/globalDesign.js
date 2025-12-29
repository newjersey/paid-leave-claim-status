import { applyFooter } from "./footer.js";
import { replaceHeader } from "./header.js";
import {
  addFeedbackWidgetScriptToHead,
  ICON_BASE_URL,
  overrideFeedbackWidgetEmailDisclaimerText
} from "../modules/shared.mjs";

export function globalDesignChanges(pageId) {
  addViewportMetaTag();
  replaceHeader(pageId);
  applyFooter(pageId);
  injectGlobalStyles();
  styleButtons();
  addFeedbackWidget();
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
      font-family: "Public Sans", sans-serif !important;
      font-variant: normal; 
    }

    a.lblClass, span.lblClass1 {
      font-family: "Public Sans", sans-serif;
      font-variant: normal;
      font-size: 16px;
    }

    .ajax__tab_panel {
      font-family: "Public Sans", sans-serif !important;
      font-variant: normal !important;
      font-size: 16px !important;
    }

    .feedback-container {
      margin: 50px 0 0 0;
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

    .usa-alert--info::before {
      content: url('${ICON_BASE_URL}/info.svg');
      background: none !important;
      -webkit-mask: none !important;
      mask: none !important;
      top: auto !important;
    }

    .usa-alert--warning::before {
      content: url('${ICON_BASE_URL}/warning.svg');
      background: none !important;
      -webkit-mask: none !important;
      mask: none !important;
      top: auto !important;
      margin-top:5px;
    }

    .usa-accordion__button[aria-expanded="false"] {
      background-image: url('${ICON_BASE_URL}/add.svg'), linear-gradient(transparent, transparent);
    }

    .usa-accordion__button[aria-expanded="true"] {
      background-image: url('${ICON_BASE_URL}/remove.svg'), linear-gradient(transparent, transparent);
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

function addFeedbackWidget() {
  const existingWidget = document.querySelector('feedback-widget');
  if (!existingWidget) {
    addFeedbackWidgetScriptToHead();
    const feedbackWidget = document.createElement('feedback-widget');
    feedbackWidget.setAttribute('contact-link', 'https://www.nj.gov/labor/myleavebenefits/help/contact/');
    feedbackWidget.setAttribute('only-save-rating-to-analytics', 'true');

    const footer = document.getElementById('helpSection');
    if (footer) {
      footer.parentNode.insertBefore(feedbackWidget, footer);
      overrideFeedbackWidgetEmailDisclaimerText();
    }
  }
}
