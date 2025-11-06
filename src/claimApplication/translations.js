const resources = {
  en: {
    translation: {
      shared: {
        no: "No",
        saveAndContinue: "Save and continue",
        yes: "Yes",
      },
      contact: {
        street1: "Street address",
        street2: "Street address line 2",
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
        phoneValidation: {
          digits_three: "Please enter exactly 3 digits",
          digits_four: "Please enter exactly 4 digits",
        },
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
        injury: "Injury",
        optional: "(optional)",
        pregnancy: "Pregnancy and recovery from childbirth",
        pregnancyDetails: "If you have any pregnancy complications, describe them below. Otherwise, you can skip this.",
        provider: {
          title: "Healthcare provider",
          explanation: "Your healthcare provider will need to confirm your medical condition and the start date of your disability.",
          info: "Healthcare provider information",
          type: {
            title: "Provider type",
            select: "Select",
            description: "Providers we accept",
            advancedPracticeNurse: "Advanced Practice Nurse",
            registeredNurse: "Registered Nurse",
            certifiedNursePractitioner: "Certified Nurse Practitioner",
            clinicalNurseSpecialist: "Clinical Nurse Specialist",
            certifiedNurseMidwife: "Certified Nurse Midwife",
            certifiedProfessionalMidwife: "Certified Professional Midwife (under supervision of a licensed physician)",
            chiropractor: "Chiropractor",
            dentist: "Dentist",
            erPhysician: "ER Physician",
            medicalDoctor: "Medical Doctor",
            optometrist: "Optometrist",
            osteopath: "Osteopath",
            podiatrist: "Podiatrist",
            psychologist: "Psychologist",
            physicianAssistant: "Physician Assistant (under supervision of a licensed physician)",
            specialist: "Specialist",
          },
          firstName: "First Name",
          lastName: "Last Name",
        },
        work: {
          title: "Worker's Compensation",
          illness: "illness",
          injury: "injury",
          causedByJob: "Was your {{disabilityType}} caused by your job? (Could be a specific incident or happened over time)",
          workersCompClaim: `Have you or your employer filed a <a href="https://www.nj.gov/labor/workerscompensation/injured-worker-protections/index.shtml" target="_blank">Workers' Compensation Claim</a>, or do you plan to file one?`,
          employerInfo: {
            prompt: "Provide employer information where the workplace {{disabilityType}} happened.",
          },
        },
      },
      reviewAndSave: {
        title: "Review and save",
        button: "Save and continue",
      },
      reviewAndSubmit: {
        title: "Review and submit",
      },
      workRelated: {
        title: "Work related information",
      },
    }
  },
};

export default resources;
