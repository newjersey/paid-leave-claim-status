import i18next from 'i18next';

export const disabilityInformationLabels = [
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt', label: 'Disability Start Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd', label: 'Last Worked Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk', label: 'Expected Return to Work Date' },
];

export const id = "disabilityInformation";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_ClientState',
  value: '"TabState":[true,false,false,false,false,false]',
};

export function changes() {
  addStyles();
  showReasonForLeave();
  setupRadioButtonListeners();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    section {
      background-color: #FBFCFD;
      border: 0.5px solid #C6CACE;
      padding: 10px;
    }

    .usa-radio__label {
      text-align: left;
    }
  `;
  document.head.appendChild(style);
}

function showReasonForLeave() {
  document.addEventListener('headerReady', setNewTitle);

  replaceBody();
}

function setNewTitle() {
  const title = document.querySelector("#pageTitle");
  if (title) {
    title.textContent = `${i18next.t('reason_for_leave.title')}`;
    document.removeEventListener('headerReady', setNewTitle);
  }
}

function replaceBody() {
  const oldContainer = document.querySelector("#ContentPlaceHolder1_ClaimantDisabilityTab");
  if (oldContainer) {
    oldContainer.style.display = 'none';

    const newMain = document.createElement('main');
    newMain.innerHTML = `
      ${reasonRadioButtons()}
    `;
    oldContainer.parentNode.insertBefore(newMain, oldContainer);
  }
}

function reasonRadioButtons() {
  return `
    <section>
      <fieldset class="usa-fieldset">
        <legend class="usa-legend usa-legend">
          ${i18next.t('reason_for_leave.prompt')}
        </legend>
        <div class="usa-radio">
          <input
            class="usa-radio__input"
            id="reason-pregnancy"
            type="radio"
            name="reasons"
            value="pregnancy"
          />
          <label class="usa-radio__label" for="reason-pregnancy">
            ${i18next.t('reason_for_leave.pregnancy')}
          </label>
        </div>
        <div id="box-pregnancy-comments" style="display: none;">
          <label class="usa-label" for="input-pregnancy-comments">
            ${i18next.t('reason_for_leave.pregnancy_comments')}
          </label>
          <textarea
            class="usa-textarea"
            id="input-pregnancy-comments"
            name="input-pregnancy-comments"
          >
          </textarea>
        </div>
        <div class="usa-radio">
          <input
            class="usa-radio__input"
            id="reason-illness"
            type="radio"
            name="reasons"
            value="illness"
          />
          <label class="usa-radio__label" for="reason-illness">
            ${i18next.t('reason_for_leave.illness')}
          </label>
        </div>
        <div id="box-illness-comments" style="display: none;">
          <label class="usa-label" for="input-illness-comments">
            ${i18next.t('reason_for_leave.illness_comments')}
          </label>
          <textarea
            class="usa-textarea"
            id="input-illness-comments"
            name="input-illness-comments"
          >
          </textarea>
        </div>
        <div class="usa-radio">
          <input
            class="usa-radio__input"
            id="reason-injury"
            type="radio"
            name="reasons"
            value="injury"
          />
          <label class="usa-radio__label" for="reason-injury">
            ${i18next.t('reason_for_leave.injury')}
          </label>
        </div>
        <div id="box-injury-comments" style="display: none;">
          <label class="usa-label" for="input-injury-comments">
            ${i18next.t('reason_for_leave.injury_comments')}
          </label>
          <textarea
            class="usa-textarea"
            id="input-injury-comments"
            name="input-injury-comments"
          >
          </textarea>
        </div>
      </fieldset>
    </section>
  `;
}

function setupRadioButtonListeners() {
  const radios = document.querySelectorAll('.usa-radio__input');
    radios.forEach(radio => {
      radio.addEventListener('change', function() {
        document.querySelectorAll('[id^="box-"]').forEach(textbox => {
          textbox.style.display = 'none';
        });

        const selectedTextbox = document.getElementById(`box-${this.value}-comments`);
        if (selectedTextbox) {
          selectedTextbox.style.display = 'block';
        }
      });
    });
}
