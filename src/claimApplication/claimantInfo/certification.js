export const certificationLabels = [
  { id: 'ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgYes', label: 'Yes, I agree' },
  { id: 'ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgNo', label: 'I do not agree' },
];

export const id = "certification";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_lblHeader',
  text: 'CLAIMANT CERTIFICATION',
};

export function changes() {
  addStyles();
  replaceBody();
  setupSubmitButton();
  setupLogoutButton();
  document.addEventListener('headerReady', setNewTitle);
}

function setupSubmitButton() {
  const newSubmitButton = document.querySelector('#agreeAndSubmit');
  const agreeButton = document.querySelector('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgYes');
  const originalSubmitButton = document.querySelector('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_btnConfirm');

  if (newSubmitButton && agreeButton && originalSubmitButton) {
    newSubmitButton.addEventListener('click', function (event) {
      event.preventDefault();
      agreeButton.click();
      originalSubmitButton.click();
    });
  }
}

function setupLogoutButton() {
  const logoutButton = document.querySelector('#saveAndLogout');
  if (logoutButton) {
    logoutButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (confirmLogout()) {
        __doPostBack('ctl00$header$lbtnLogout', '');
      }
    });
  }
}

function replaceBody() {
  const oldContainer = document.querySelector("#ContentPlaceHolder1_ClaimantCertTab");
  if (oldContainer) {
    oldContainer.style.display = 'none';

    const newMain = document.createElement('main');
    newMain.innerHTML = `
      <div class="usa-alert usa-alert--info">
        <div class="usa-alert__body">
          <p class="usa-alert__heading" style="font-size: 16px;font-weight: bold;">Before you submit</p>
          <p class="usa-alert__text">
            Be sure that all your answers are correct. You can't change any of your answers after you click submit below. You must contact the Division of Temporary Disability Insurance to report any changes that may affect your claim.
          </p>
        </div>
      </div>
      <p style="margin-top: 20px;">By submitting, I certify:</p>
      <ul>
        <li>I have answered all questions completely and truthfully to the best of my knowledge.</li>
        <li>I could face fines and criminal charges if I purposefully provide false information or don't share crucial details that could impact my claim.</li>
        <li>I will have to pay back any benefits I'm not entitled to or be subject to deductions of funds from future benefits.</li>
        <li>I allow the Division of Temporary Disability Insurance to verify my Social Security number. I allow them to access any necessary medical, employment, and Social Security benefit entitlement information to determine my eligibility for benefits.</li>
      </ul>
      <button id="agreeAndSubmit" class="usa-button" type="button">Agree and submit application</button>
      <button id="saveAndLogout" class="usa-button usa-button--unstyled" type="button">Save and logout</button>
      <p><strong>Note:</strong> If you wait more than 14 days to come back and finish your application, you'll have to start over.</p>
    `;
    oldContainer.parentNode.insertBefore(newMain, oldContainer);
  }
}

function setNewTitle() {
  const title = document.querySelector("#pageTitle");
  if (title) {
    title.textContent = 'Agree and finish';
    document.removeEventListener('headerReady', setNewTitle);
  }
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    .usa-button {
      margin: 20px 20px 20px 0;
      min-height: 40px;
    }
    .usa-button--unstyled {
      padding: 0;
    }
    ul {
      line-height: 1.6em;
      padding: 0 20px;
    }
  `;
  document.head.appendChild(style);
}
