const resources = {
  en: {
    translation: {
      shared: {
        dateFormat: "mm/dd/yyyy",
        illness: "illness",
        injury: "injury",
        no: "No",
        optional: "(optional)",
        saveAndContinue: "Save and continue",
        yes: "Yes",
      },
      contact: {
        address: "Address",
        street1: "Street address",
        street2: "Street address line 2 (optional)",
        city: "City",
        state: "State",
        zipcode: "ZIP code",
        phone: "Phone number",
        phoneHint: "10-digit, U.S. only, for example 999-999-9999",
      },
      certification: {
        certifyText: "By submitting, I certify:",
        alertText: "Your application has been saved. If needed, you can log out and finish your application within 14 days from when you first started it.",
        agreement1: "I have answered all questions completely and truthfully to the best of my knowledge and must report any changes that may affect my claim to the Division of Temporary Disability Insurance.",
        agreement2: "I could face fines and criminal charges if I purposefully provide false information or don't share crucial details that could impact my claim.",
        agreement3: "I will have to pay back any benefits I'm not entitled to or be subject to deductions of funds from future benefits.",
        agreement4: "I allow the Division of Temporary Disability Insurance to verify my Social Security number. I allow them to access any necessary medical, employment, and Social Security benefit entitlement information to determine my eligibility for benefits.",
        agreeAndSubmit: "Agree and submit application",
      },
      citizenship: {
        title: "Contact information",
        addRepresentativeTitle: "Add a representative",
        phoneValidation: {
          digits_three: "Please enter exactly 3 digits",
          digits_four: "Please enter exactly 4 digits",
        },
        altPhone: "Alternate phone number",
        phone: "Phone number",
        email: "Email address. This is where we will send your application summary.",
        confirm_email: "Confirm email address",
        representative: `You can choose someone you trust to discuss your claim with us. When you contact customer support, we'll only share details with you or that person. Would you like to add a representative?`,
        representative_name: "Representative's name",
        representative_dob: "Representative's date of birth",
        representative_phone: "Representative's phone number",
      },
      confirmation: {
        title: "Action required; final step!",
        tasks_one: "You have the below task to complete.",
        tasks_other: "You have the below tasks to complete. Tasks may be done in any order.",
        checkmark: "Checkmark",
        submitted: `Your application was submitted. Your claim number is: <strong>{{claim_id}}</strong>. <a id="applicationPdfDownload" class="usa-link" href="#">Download a copy here (PDF)</a>.`,
        future_claim: `Your claim number is: <strong>{{claim_id}}</strong>. <a id="futurePdfDownload" class="usa-link" href="#">Download a summary here (PDF)</a>.`,
        dueDate: "Best to complete by {{est_deadline_date}}",
        form_directions: {
          copySocSecLetter: `Attach a copy of your <a href="https://www.ssa.gov/manage-benefits/get-benefit-letter" target="_blank">Social Security benefit verification letter</a>`,
          complete: "Complete and sign the form",
          claim_number: "Write your claim number on every page: <strong>{{claim_id}}</strong>",
          submit: `
            Fax to (609) 984-4138 (fastest)
            <br><br>
            Or, mail to:
            <br>
            Division of Temporary Disability Insurance
            <br>
            P.O. Box 387
            <br>
            Trenton, NJ 08625-0387
          `,
        },
        m01: {
          title: "{{requiredActionsIndex}}. Ask your healthcare provider to complete Form M01",
          directions: "A qualified healthcare provider must confirm your disability by completing the medical form online.",
          sample: {
            title: "How to tell your provider what's needed",
            body: `Subject: Request for Medical Form M01 - Temporary Disability Claim
<br><br>
Dear {{provider_name}},
<br><br>
I'm requesting your help to complete Form M01 for my New Jersey Temporary Disability Insurance claim. The easiest way to submit it is online at www.nj.gov/labor/MedicalApplicationTDI using this Online Form ID: {{online_form_id}} and my date of birth: {{user_dob}}. 
<br><br>
Please submit the form by {{est_deadline_date}} to avoid delays on my claim. Please let me know when it's complete. Thank you for your help.
<br><br>
{{user_name}}
<br>
{{user_email}}
<br>
{{user_phone}}
            `,
            empty: {
              provider_name: "{{ INSERT YOUR MEDICAL PROVIDER'S NAME }}",
              user_dob: "{{ INSERT YOUR DATE OF BIRTH }}",
              user_name: "{{ INSERT YOUR NAME }}",
            },
            copyButton: "Copy this starter message",
            copied: "Copied!",
          },
          alternative: {
            instructions: `Alternatively, you may bring printed instructions to your healthcare provider.`,
            buttonText: "Download provider instructions (Form M01)",
          },
        },
        c01Award: {
          title: "{{requiredActionsIndex}}. Fax or mail proof of your Social Security disability benefits.",
          download_button: "Download Form C01 (PDF)",
        },
        c01Card: {
          title: "{{requiredActionsIndex}}. Fax or mail our request for more information (C01)",
          download_button: "Download Form C01 (PDF)",
        },
        w01: {
          title: "{{requiredActionsIndex}}. Fax or mail your Workers' Compensation (Form W01)",
          download_button: "Download Form W01 (PDF)",
        },
        v01: {
          title: "{{requiredActionsIndex}}. Fax or mail your Identity Verification form (Form V01)",
          download_button: "Download Form V01 (PDF)",
        },
        moreInfo: {
          title: "Heads up",
          mail: {
            title: "As we process your claim, we will mail forms to:",
            change_address: `<strong>Need to change your address?</strong> <a href="/tdi/AddressChange_Introduction.aspx" target="_blank">Submit a change of address request.</a>`,
          },
          next: {
            title: "What happens next?",
            read_doc: `Read through <a href="https://www.nj.gov/labor/myleavebenefits/worker/resources/claims-status.shtml" target="_blank">"What happens when I apply?"</a> on myLeaveBenefits.nj.gov`,
            check_status: `<a href="/DOL_DABI/" target="_blank">Check your claim status</a> (note: it takes several days for your first status update)`,
          },
        },
      },
      header: {
        personal_information: "Personal information",
        leave_information: "Leave information",
        work_information: "Work information",
        agree_and_finish: "Agree and finish",
        summary_and_next_steps: "Summary and next steps",
      },
      leaveSchedule: {
        title: "Leave schedule",
        futureDate: {
          title: "You're a little early",
          body: `We can't accept applications dated in the future. You can come back and apply on the day your disability begins — the first day you stop working because of your condition.
            <br><br>
            We recommend setting a reminder so you can return and apply on time.
          `,
        },
        illnessInjury: {
          fddTitle: "First day of disability leave",
         fddNotes: `<strong>Heads up:</strong>
          <ul class="usa-list">
            <li>You can apply starting the day your disability begins — the first day you stop working because of your illness or injury.</li>
            <li>Enter your "first day of disability leave" carefully. If this date changes, you'll need to update us in writing.</li>
          </ul>
          `,
          fddQuestion: `What is your first day of disability leave?
            <br><br>
            <strong>Hint:</strong> This is when your {{disabilityTypeString}} first prevented you from working. Enter the actual date, even if it was a day you don't usually work (like a weekend or holiday).
          `,
          beforeAfterTitle: "Dates of employment before and after disability",
          lastWorkday: `What was the last day you worked?
            <br><br>
            <strong>Hint:</strong> This is the last day you actually worked — not including PTO, vacation, or sick days you used before your leave started.
          `,
          recovered: `Have you recovered from this condition? "Recovered" means you're able to return to work.
          `,
          recoveryDate: "When did you recover (felt able to return to work)?",
          estRecoveryDate: "When do you anticipate being able to return to work? This can be an estimate.",
        },
        pregnancy: {
          fddTitle: "First day of disability leave for pregnancy",
          maternityTimeline: `Use the <a href="https://www.nj.gov/labor/myleavebenefits/labor/myleavebenefits/worker/maternity/timeline-welcome.shtml" target="_blank">Maternity Timeline Coverage Tool</a> to help plan your leave dates.`,
          fddNotes: `<strong>Heads up:</strong>
            <ul class="usa-list">
              <li>You can apply starting the day your leave begins.</li>
              <li>Enter your "first day of disability leave" carefully. If this date changes, you'll need to update us in writing.</li>
            </ul>
`,
          fddQuestion: `What is your first date of disability leave?
            <br><br>
            Remember:
            <ul class="usa-list">
              <li>You can begin your leave up to 4 weeks before your due date (or delivery date), or earlier if you experience complications.</li>
              <li>Enter the actual date your leave began, even if it was a day you don't usually work (like a weekend or holiday).</li>
            </ul>
            <br>
          `,
          beforeAfterTitle: "Before and after pregnancy/delivery",
          lastWorkday: `What was the last day you worked?
            <br><br>
            <strong>Hint:</strong> This is the last day you actually worked-- not including PTO, vacation, or sick days you used before your leave started.
          `,
          recovered: `Have you already recovered from delivery?
            <br><br>
            <strong>Hint:</strong> You are entitled to at least 6 or 8 weeks of recovery time using TDI. After it ends, you can apply separately for family leave to bond with your baby. The <a href="https://www.nj.gov/labor/myleavebenefits/labor/myleavebenefits/worker/maternity/timeline-welcome.shtml" target="_blank">Maternity Timeline Tool</a> can help you plan.
          `,
          recoveryDate: `When did you recover?`,
          estRecoveryDate: "When do you expect to recover?",
          whatsNext: "What's Next?",
          howDelivered: `After we approve your claim, we’ll mail you a form. It will ask how you delivered (if you haven't already told us) and whether you need more time to recover. 
            <br><br>
            <ul>
              <li>You can receive 6 weeks to recover from vaginal birth</li>
              <li>You can receive 8 weeks to recover from C-section birth</li>
              <li>You can receive more with postpartum complications</li>
            </ul>
          `
        },
      },
      medicalInfo: {
        title: "Medical details",
        provider: {
          title: "Your healthcare provider",
          explanation: "Your healthcare provider must confirm your medical condition and the start of your disability. They must also be qualified to treat your specific condition.",
          info: "Healthcare provider information",
          notAcceptedMessage:"Your application could get delayed or denied if it isn't certified by an approved healthcare provider.",
          theseTypesProviders: "These types of healthcare providers can certify your leave:",
          type: {
            isAccepted: "Is your healthcare provider one of these?",
            advancedPracticeNurse: "Advanced Practice Nurse",
            certifiedNurseMidwife: "Certified Nurse Midwife",
            certifiedNursePractitioner: "Certified Nurse Practitioner",
            certifiedProfessionalMidwife: "Certified Professional Midwife (under supervision of a licensed physician)",
            chiropractor: "Chiropractor",
            clinicalNurseSpecialist: "Clinical Nurse Specialist",
            dentist: "Dentist",
            medicalDoctor: "Medical Doctor",
            optometrist: "Optometrist",
            physicianAssistant: "Physician Assistant (under supervision of a licensed physician)",
            podiatrist: "Podiatrist",
            psychologist: "Psychologist",
          },
          name: "Name",
          inUSA: "Is your healthcare provider located in the United States?",
        },
        work: {
          title: "Workers' Compensation",
          causedByJob: "Was your disability caused by your job? (Could be a specific incident or happened over time)",
          workersCompClaim: `Have you or your employer filed a <a href="https://www.nj.gov/labor/workerscompensation/injured-worker-protections/index.shtml" target="_blank">Workers' Compensation Claim</a>, or do you plan to file one?`,
          workersCompClaimApproved: "Have you been approved for (or awarded, or received) Workers' Compensation benefits?",
          employerInfo: {
            prompt: "Provide employer information where the workplace {{disabilityTypeString}} happened.",
            name: "Employer name",
          },
          dateOfDisability: "When did this {{disabilityTypeString}} happen (or start)?",
        },
      },
      otherBenefits: {
        title: "Other benefits",
      },
      paymentInfo: {
        title: "Federal taxes",
      },
      personalProfile: {
        title: "Demographic information",
      },
      reasonForLeave: {
        title: "Reason for leave",
        characterLimit: "{{limit}} character limit",
        chooseReason: "Choose your reason for applying for Temporary Disability benefits:",
        illness: "Illness (including mental health)",
        illnessDetails: "Briefly describe your illness or condition (for example, what you're being treated for or recovering from).",
        injury: "Injury",
        injuryDetails: "Briefly describe how and where the injury happened (for example, a fall at work or a car accident).",
        pregnancy: "Pregnancy and recovery from childbirth",
        pregnancyDetails: "If you have any pregnancy complications, describe them below. Otherwise, you can skip this.",
      },
      reviewAndSave: {
        title: 'Review and save',
        button: 'Save and continue',
        reasonForLeave: {
          reasonLabel: 'Reason',
          detailsLabel: 'Details',
          illness: 'Illness',
        },
        leaveSchedule: {
          firstDay: "First day of disability leave for",
          returnedWork: 'Recovered/returned work',
          lastWorkday: 'Last workday',
          pregnancy: "pregnancy",
          illness: "illness",
          injury: "injury",
        },
        workInfo: {
          fileOrIntend: "File or intend to file Workers' Compensation claim:",
          employerInfo: "Employer information where the",
          happened: "happened",
          dateOf: "Date of",
          approved: "Approved for Workers' Compensation benefits",
          receivingBenefits: "Receiving benefits same time as TDI:",
          injuryIllness: "injury/illness"
        }
      },
      reviewAndSubmit: {
        title: "Review and submit",
      },
      workRelated: {
        title: "Workers' Compensation",
      },
    }
  },
};

export default resources;
