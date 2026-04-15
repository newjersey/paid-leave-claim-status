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
      font-variant: normal !important; 
    }

    a.lblClass, span.lblClass, span.lblClass1 {
      font-family: "Public Sans", sans-serif;
      font-variant: normal;
      font-size: 16px;
    }

    span {
      font-family: "Public Sans", sans-serif;
    }

    .bordered-set {
      background: white;
      border: 1px solid #b2b2b2;
      border-radius: 5px;
      margin: 10px 0;
      padding: 10px;
    }

    .dateInput {
      margin-top: 0;
    }

    .dateInputContainer {
      display: flex;
      align-items: center;
      margin-top: 0.5rem;
    }

    .form-alert {
      color: rgb(139, 0, 0);
      font-weight: bold;
      margin: 10px 0 0 0;
    }

    .form-alert svg {
      vertical-align: -5px;
      margin-right: 2px;
    }

    .required-asterisk {
      color: rgb(139, 0, 0);
      font-weight: bold;
    }

    .required-asterisk-inline {
      margin-right: 3px;
    }

    .usa-checkbox__label, .usa-combo-box__input, .usa-combo-box__list, .usa-fieldset, .usa-hint, .usa-input, .usa-input-group, .usa-radio__label, .usa-range, .usa-select, .usa-textarea, .usa-button, .usa-table, .usa-label, .usa-legend, .usa-alert  {
      font-family: "Public Sans", sans-serif;
    }

    .ajax__tab_panel {
      font-family: "Public Sans", sans-serif !important;
      font-variant: normal !important;
      font-size: 16px !important;
    }

    .feedback-container {
      margin: 50px 0 0 0;
    }

    .usa-legend {
      max-width: 100%;
    }

    .usa-radio {
      margin-bottom: 0;
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

    .usa-alert__heading {
      font-size: 24px;
      margin: 0 0 10px;
      color: black;
      font-variant: normal;
      font-weight: bold;
    }

    .usa-accordion__button[aria-expanded="false"] {
      background-image: url('${ICON_BASE_URL}/add.svg'), linear-gradient(transparent, transparent);
    }

    .usa-accordion__button[aria-expanded="true"] {
      background-image: url('${ICON_BASE_URL}/remove.svg'), linear-gradient(transparent, transparent);
    }

    .usa-checkbox__input:checked+[class*=__label]:before, .usa-checkbox__input:checked:disabled+[class*=__label]:before {
      background-image: url('${ICON_BASE_URL}/correct8.svg'), linear-gradient(transparent, transparent);
    }

    .usa-list li {
      list-style-type: disc !important;
      max-width: 100%;
    }

    .usa-select {
      background-image: url('${ICON_BASE_URL}/unfold_more.svg'), linear-gradient(transparent, transparent);
    }

    input[type="image"][alt="calendar"] {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      padding-bottom: 2px;
      margin-left: 5px;
    }

    #ContentPlaceHolder1_ClaimantDisabilityTab_body,
    #ContentPlaceHolder1_ClaimantDisabilityTab {
      background-color: transparent !important;
    }

    /* Calendar popup container */
    #FDDCalendarControl table, #CalendarControl table {
      background-color: #EDEFF0;
      border-left: 5px solid #EDEFF0;
      border-right: none;
      font-size: 16px;
    }

     #CalendarControl td.empty,
    #FDDCalendarControl td.empty {
      visibility: hidden !important;
    }

    #CalendarControl td,
    #CalendarControl th,
    #FDDCalendarControl td,
    #FDDCalendarControl th {
      width: 36px !important;
      height: 36px !important;
      padding: 0 !important;
      margin: 0 !important;
      border: 0 !important;
      box-sizing: border-box !important;
    }

    #CalendarControl tr.header,
    #CalendarControl tr.footer,
    #FDDCalendarControl tr.header,
    #FDDCalendarControl tr.footer {
      background-color: #EDEFF0
    }

    #CalendarControl tr.header td,
    #CalendarControl tr.footer td,
    #FDDCalendarControl tr.header td,
    #FDDCalendarControl tr.footer td {
      background-color: #EDEFF0
    }

    #CalendarControl th a,
    #FDDCalendarControl th a,
    #FDDCalendarControl .previous a,
    #FDDCalendarControl .next a {
      color: blue;
      text-decoration: underline;
    }

    #CalendarControl .title,
    #FDDCalendarControl .title {
      color: black;
    }

    #CalendarControl .weekday,
    #CalendarControl .weekend,
    #CalendarControl .current,
    #FDDCalendarControl .weekday,
    #FDDCalendarControl .weekend,
    #FDDCalendarControl .current {
      background-color: #EDEFF0;
      border: none;
      line-height: 26px;
    }

    #CalendarControl .weekday:hover,
    #CalendarControl .weekend:hover,
    #CalendarControl .current:hover,
    #FDDCalendarControl .weekday:hover,
    #FDDCalendarControl .weekend:hover,
    #FDDCalendarControl .current:hover {
      background-color: #dfe1e2;
      border: none;
      color: black;
    }

    #CalendarControl .weekday:active,
    #CalendarControl .weekend:active,
    #CalendarControl .current:active,
    #FDDCalendarControl .weekday:active,
    #FDDCalendarControl .weekend:active,
    #FDDCalendarControl .current:active {
      background-color: #c6cace;
      border: none;
      color: black;
    }

    #CalendarControl .current,
    #FDDCalendarControl .current {
      border: 5px solid #005ea2;
      color: black;
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
