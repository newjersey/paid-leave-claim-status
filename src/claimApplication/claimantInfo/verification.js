import i18next from 'i18next';
import {
  addToSessionData,
  fixPhoneNumberText,
  replaceVerificationRadioButtons,
  setNewTitle,
  STORAGE_KEY_PROVIDER_NAME,
  getSessionData,
  STORAGE_KEY_REASON_FOR_LEAVE,
  STORAGE_KEY_DISABILITY_INFO_VIEW,
} from '../utils';

export const otherBenefitsVerificationLabels = [
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDisabDate', label: 'First Day of Disability' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerReturn', label: 'Returned to Work' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVetDtLast', label: 'Last Day Worked' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerRetWork', label: 'Expected Returned to Work Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDisabDesc', label: 'Disability/Injury Description' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocName', label: 'Doctor/Hospital Name' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocStreet', label: 'Doctor/Hospital Address Line 1' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocAddr2', label: 'Doctor/Hospital Address Line 2' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocCity', label: 'Doctor/Hospital City' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocState', label: 'Doctor/Hospital State' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocZip1', label: 'Doctor/Hospital Zipcode 1' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocZip2', label: 'Doctor/Hospital Zipcode 2' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel', label: 'Doctor/Hospital Phone Number First 3 Digits' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel2', label: 'Doctor/Hospital Phone Number Digits 4, 5, and 6' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel3', label: 'Doctor/Hospital Phone Number Last 4 Digits' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTelExt', label: 'Doctor/Hospital Phone Number Extension' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerEmer', label: 'Emergency Room Treatment' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtHospVer', label: 'Hospitalization' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_TxtVerInjWk', label: 'Disability/Injury Work Related' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerTDBenefits', label: 'Temporary Disability Benefits Received from Another State' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerTDBenfEMP', label: 'Temporary Disability Benefits Received from Employer/Union' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerTDSSBenf', label: 'Social Security Disability Benefits Applied For or Received' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerTDUIbenfRecvd', label: 'Unemployment Insurance Benefits' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_lblFIT', label: 'Federal Income Tax Withholding' },
];

export const id = "verification";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification',
  text: 'My disability information is correct',
};

export function changes() {
  adjustTable();
  fixOverflowingText();
  fixPhoneNumberText(
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel',
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel2',
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel3',
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTelExt'
  );
  saveProvider();
  replaceVerificationRadioButtons(
    'My disability information is correct',
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_rbtnDisabsYes',
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_btncontinueVer'
  );
  renamePages();
  createReasonForLeaveSection();
  reorderAndRenameLeaveScheduleFields()
  restructureWorkRelatedSection()
  hideDisabilityInfoInMedicalSection();
  setupEditButtonHandlers();
  setNewTitle(i18next.t('reviewAndSave.title'));
}

function adjustTable() {
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    table.style.width = '100%';
    table.style.tableLayout = 'auto';

    const cells = table.querySelectorAll('td, th');
    cells.forEach(cell => {
      cell.style.textAlign = 'left';
      cell.style.width = '100%';
      cell.style.display = 'block';
    });

    const inputsAndTextareas = table.querySelectorAll('input[type="text"], textarea');
    inputsAndTextareas.forEach(element => {
      element.style.width = '100%';
      element.style.maxWidth = '100%';
      element.style.boxSizing = 'border-box';
      element.style.textAlign = 'left';
    });
  });
}

function fixOverflowingText() {
  const otherStateInfo = document.querySelector('#divVerTDI');
  if (otherStateInfo) {
    otherStateInfo.style.height = 'fit-content';
  }
}

function saveProvider() {
  const submit = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_btncontinueVer');
  const providerName = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocName');
  submit.addEventListener('click', function () {
    addToSessionData({
      [STORAGE_KEY_PROVIDER_NAME]: providerName.value.trim()
    });
  });
}

function renamePages() {
  const elementsToRename = [
    {
      id: "#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_BtnDisInfoEdit",
      oldName: "Disability Information",
      newNameKey: 'leaveSchedule.title'
    },
    {
      id: "#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_btnVerDisab",
      oldName: "Medical Treatment Information",
      newNameKey: 'medicalInfo.title'
    },
    {
      id: "#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_BtnWREdit",
      oldName: "Work Related Information",
      newNameKey: 'workRelated.title'
    },
    {
      id: "#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_BtnOBEdit",
      oldName: "Other Benefits",
      newNameKey: 'otherBenefits.title'
    },
    {
      id: "#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_btnVerLatepay",
      oldName: "Payment Information",
      newNameKey: 'paymentInfo.title'
    }
  ];

  elementsToRename.forEach(({ id, oldName, newNameKey }) => {
    const legendElement = document.querySelector(id).parentElement;
    if (legendElement) {
      legendElement.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes(oldName)) {
          node.textContent = node.textContent.replace(oldName, i18next.t(newNameKey));
        }
      });
    }
  });
}


function hideDisabilityInfoInMedicalSection() {
  const editBtn = document.querySelector(
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_btnVerDisab'
  );
  const fieldset = editBtn?.closest('fieldset');
  if (!fieldset) return;

  const descriptionTextarea = fieldset.querySelector(
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDisabDesc'
  );
  if (descriptionTextarea) {
    const descriptionTable = descriptionTextarea.closest('table');
    if (descriptionTable) {
      descriptionTable.style.display = 'none';
    }
  }
}


function createReasonForLeaveSection() {
  const descriptionTextarea = document.querySelector(
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDisabDesc'
  );
  if (!descriptionTextarea) return;

  let rawValue = descriptionTextarea.value || '';

  // Remove paste signal suffix (e.g., "p120")
  rawValue = rawValue.replace(/p\d+$/, '').trim();

  if (!rawValue) return;

  const firstPeriodIndex = rawValue.indexOf('. ');

  let reason;
  let details;

  if (firstPeriodIndex !== -1) {
    reason = rawValue.substring(0, firstPeriodIndex);
    details = rawValue.substring(firstPeriodIndex + 2);
  } else {
    reason = rawValue;
    details = '';
  }

  const reasonLabels = {
    'pregnancy': i18next.t('reasonForLeave.pregnancy'),
    'illness': i18next.t('reviewAndSave.reasonForLeave.illness'),
    'injury': i18next.t('reasonForLeave.injury')
  };

  const reasonLabel = reasonLabels[reason] || reason;

  // Remove paste signal suffix if present (e.g., "p120")
  const cleanDetails = details.replace(/p\d+$/, '');

  const displayText = cleanDetails
    ? `${reasonLabel}: ${cleanDetails}`
    : reasonLabel;

  const disabilityEditBtn = document.querySelector(
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_BtnDisInfoEdit'
  );
  const disabilityFieldset = disabilityEditBtn?.closest('fieldset');

  if (!disabilityFieldset) {
    return;
  }

  const reasonSection = document.createElement('fieldset');
  reasonSection.id = 'reasonForLeaveReviewSection';
  reasonSection.innerHTML = `
      <legend>
      ${i18next.t('reasonForLeave.title')}&nbsp;&nbsp;
      <input type="button" value="EDIT" id="editReasonForLeave" class="btnEdit usa-button" autocomplete="off">
      &nbsp;
      </legend>
      <p>
      <span style="font-weight: bold;">${displayText}</span>
      </p>
  `;

  // Insert before the Disability Information fieldset
  const parentTd = disabilityFieldset.parentElement;
  const newTd = document.createElement('td');
  newTd.className = 'style2';
  newTd.appendChild(reasonSection);
  const parentTr = parentTd.parentElement;
  const newTr = document.createElement('tr');
  newTr.appendChild(newTd);
  parentTr.parentElement.insertBefore(newTr, parentTr);
}

function reorderAndRenameLeaveScheduleFields() {
  const fieldset = document.querySelector(
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_BtnDisInfoEdit'
  )?.closest('fieldset');

  if (!fieldset) return;

  const table = fieldset.querySelector('table');
  if (!table) return;

  const lastWorkdayInput =
    document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVetDtLast');
  const firstDayDisabilityInput =
    document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDisabDate');
  const returnedToWorkInput =
    document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerReturn');
  const recoveryDateInput =
    document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerRetWork');

  const lastWorkdayValue = lastWorkdayInput?.value || '';
  const firstDayDisabilityValue = firstDayDisabilityInput?.value || '';
  const returnedToWorkValue = returnedToWorkInput?.value || '';
  const recoveryDateValue = recoveryDateInput?.value || '';

  const savedData = getSessionData();
  const reasonData = savedData[STORAGE_KEY_REASON_FOR_LEAVE];
  const reason = reasonData?.reasons;

  const reasonText = {
    'pregnancy': i18next.t('reviewAndSave.leaveSchedule.pregnancy'),
    'injury': i18next.t('reviewAndSave.leaveSchedule.injury'),
    'illness': i18next.t('reviewAndSave.leaveSchedule.illness')
  }[reason] || 'disability';

  table.style.display = 'none';

  const displayDiv = document.createElement('div');
  displayDiv.id = 'leaveScheduleDisplay';
  displayDiv.innerHTML = `
    <p>
      <span>${i18next.t('reviewAndSave.leaveSchedule.lastWorkday')}:</span>
      <strong>${lastWorkdayValue}</strong>
    </p>
    <p>
      <span
        >${i18next.t('reviewAndSave.leaveSchedule.firstDay')} ${reasonText}:</span
      >
      <strong>${firstDayDisabilityValue}</strong>
    </p>
    <p>
      <span>${i18next.t('reviewAndSave.leaveSchedule.returnedWork')}:</span>
      <strong>${returnedToWorkValue}</strong>
    </p>
    <p><span>Recovery date:</span> <strong>${recoveryDateValue}</strong></p>
`;

  table.parentNode.insertBefore(displayDiv, table.nextSibling);
}

function setupEditButtonHandlers() {
  const disabilityEditBtn = document.querySelector(
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_BtnDisInfoEdit'
  );

  let goingToReasonForLeave = false;

  // Custom edit button for new Reason for Leave section
  const reasonEditBtn = document.querySelector('#editReasonForLeave');
  if (reasonEditBtn) {
    reasonEditBtn.addEventListener('click', function (e) {
      e.preventDefault();
      goingToReasonForLeave = true;
      addToSessionData({ [STORAGE_KEY_DISABILITY_INFO_VIEW]: 'reasonForLeave' });
      // Click the Disability Information edit but no flag for skipping leave schedule
      if (disabilityEditBtn) {
        disabilityEditBtn.click();
      }
    });
  }

  if (disabilityEditBtn) {
    disabilityEditBtn.addEventListener('click', function () {
      if (!goingToReasonForLeave) {
        addToSessionData({ [STORAGE_KEY_DISABILITY_INFO_VIEW]: 'leaveSchedule' });
      }
    });
  }
}

function restructureWorkRelatedSection() {
  const workRelatedEditBtn = document.querySelector(
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_BtnWREdit'
  );
  const fieldset = workRelatedEditBtn?.closest('fieldset');
  if (!fieldset) return;

  const savedData = getSessionData();
  const reasonData = savedData[STORAGE_KEY_REASON_FOR_LEAVE];
  const reason = reasonData?.reasons || i18next.t('reviewAndSave.workInfo.injuryIllness')
  if (reason == "pregnancy") {
    fieldset.style.display = 'none';
    return;
  }

  const injuredAtWorkplaceInput = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_TxtVerInjWk');
  const empNameInput = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerInjEmpNm');
  const empAddr1Input = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerEmpadd1');
  const empAddr2Input = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerEmpadd2');
  const empCityInput = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerEmpCity');
  const empStateInput = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerEmpState');
  const empZip1Input = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerEmpZip1');
  const empZip2Input = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerEmpZip2');
  const empPh1Input = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerInjEmpPh');
  const empPh2Input = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerInjEmpPh2');
  const empPh3Input = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerInjEmpPh3');
  const empPh4Input = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerInjEmpPh4');
  const injDateInput = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerInjDt');
  const wcDeterInput = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDeter');
  const wcBenefitsInput = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerTempWC');

  const filedWorkersComp = injuredAtWorkplaceInput?.value || 'No';
  const empName = empNameInput?.value || '';
  const empAddr1 = empAddr1Input?.value || '';
  const empAddr2 = empAddr2Input?.value || '';
  const empCity = empCityInput?.value || '';
  const empState = empStateInput?.value || '';
  const empZip1 = empZip1Input?.value || '';
  const empZip2 = empZip2Input?.value || '';
  const empPhone = formatPhone(empPh1Input?.value, empPh2Input?.value, empPh3Input?.value, empPh4Input?.value);
  const injDate = injDateInput?.value || '';
  const wcDetermination = wcDeterInput?.value || '';
  const wcBenefits = wcBenefitsInput?.value || '';

  let addressParts = [empAddr1];
  if (empAddr2) addressParts.push(empAddr2);
  addressParts.push(`${empCity}, ${empState} ${empZip1}${empZip2 ? '-' + empZip2 : ''}`);
  const fullAddress = addressParts.join('<br>');

  // Hide the existing content
  const divVerRelatedInfo = document.querySelector('#divVerRelatedInfo');
  if (divVerRelatedInfo) {
    divVerRelatedInfo.style.display = 'none';
  }

  // Hide the "Disability Injury Work Related" row (first row in the table)
  const firstTable = fieldset.querySelector('table');
  if (firstTable) {
    firstTable.style.display = 'none';
  }

  const displayDiv = document.createElement('div');
  displayDiv.id = 'workRelatedDisplay';

  if (filedWorkersComp === 'Yes') {
    displayDiv.innerHTML = `
    <p class="margin-left-0">
      <span>${i18next.t('reviewAndSave.workInfo.fileOrIntend')}</span>
      <strong>${filedWorkersComp}</strong>
    </p>
    <p class="margin-left-0">
      <span>${i18next.t('reviewAndSave.workInfo.employerInfo')} ${reason} ${i18next.t('reviewAndSave.workInfo.happened')}:</span>
    </p>
    <div style="margin-left: 10px;">
      <p class="margin-left-0">
        <span>Name:</span>
        <strong>${empName}</strong>
      </p>
      <p class="margin-left-0">
        <span>Address:</span><br>
        <strong>${fullAddress}</strong>
      </p>
      <p class="margin-left-0">
        <span>Phone:</span>
        <strong>${empPhone}</strong>
      </p>
    </div>
    <p class="margin-left-0">
      <span>${i18next.t('reviewAndSave.workInfo.dateOf')} ${reason}:</span>
      <strong>${injDate}</strong>
    </p>
    <p class="margin-left-0">
      <span>${i18next.t('reviewAndSave.workInfo.approved')}</span>
      <strong>${wcDetermination}</strong>
    </p>
    <p class="margin-left-0">
      <span>${i18next.t('reviewAndSave.workInfo.receivingBenefits')}</span>
      <strong>${wcBenefits}</strong>
    </p>
  `;
  } else {
    displayDiv.innerHTML = `
    <p class="margin-left-0">
      <span>${i18next.t('reviewAndSave.workInfo.fileOrIntend')}</span>
      <strong>${filedWorkersComp}</strong>
    </p>`;
  }

  // Insert after the legend
  const legend = fieldset.querySelector('legend');
  if (legend) {
    legend.insertAdjacentElement('afterend', displayDiv);
  }
}

function formatPhone(ph1, ph2, ph3, ext) {
  if (!ph1 && !ph2 && !ph3) return '';
  let phone = `(${ph1 || ''}) ${ph2 || ''}-${ph3 || ''}`;
  if (ext) {
    phone += ` ext. ${ext}`;
  }
  return phone;
}