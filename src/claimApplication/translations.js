const resources = {
  en: {
    translation: {
      shared: {
        dateFormat: "mm/dd/yyyy",
        disability: "disability",
        illness: "illness",
        injury: "injury",
        no: "No",
        optional: "(optional)",
        saveAndContinue: "Save and continue",
        yes: "Yes",
        makeSelection: "Make a selection.",
        ssn: "Social Security Number",
        dob: "Birthdate",
      },
      contact: {
        name: "Name",
        address: "Address",
        street1: "Street address",
        street2: "Street address line 2 (optional)",
        city: "City",
        state: "State",
        stateOrTerritory: "State or territory",
        zipcode: "ZIP code",
        country: "Country",
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
      employerDetails: {
        name: "Employer name",
        stillWorkHere: "Are you currently employed by this employer?",
        stillWorkHereEmployer: "Are you currently employed by {{employerName}}?",
        startLabel: "When did you start working for this employer?",
        startLabelEmployer: "When did you start working for {{employerName}}?",
        startHint: "If you don't remember the exact date, provide your best guess.",
        endLabel: "What was the last day you worked for this employer?",
        endLabelEmployer: "What was the last day you worked for {{employerName}}?",
        endHint: "Hint: Don't count any PTO, vacation, or sick days—just the last day you actually performed work.",
        endLabelCurrent: "What was the last day you did any work for this employer before your leave started on {{firstDayOfDisability}}?",
        endLabelCurrentEmployer: "What was the last day you did any work for {{employerName}} before your leave started on {{firstDayOfDisability}}?",
        endInfo: "Heads up: Earlier you marked {{lastDayOfWork}} as your last day of work. At least one employer should end on this date to match.",
        endWarning: `
        Heads up! The date you entered is after the last day of work you gave earlier, {{lastDayOfWork}}. You can either:
        <br>
        * Choose a date on or before {{lastDayOfWork}}, OR
        <br>
        * <a id="update-last-day-link" class="usa-link" href="#">Go back and update your last day of work</a> (your progress will be saved)
        `,
        endWarningOnFDD: "Heads up! The date you entered is after the last day of work you gave earlier, {{lastDayOfWork}}. Please choose a date on or before {{lastDayOfWork}}.",
        endError: "The date you entered is after the first day of disability leave, {{firstDayOfDisability}}. Please choose an earlier date.",
      },
      header: {
        personal_information: "Personal information",
        leave_information: "Leave information",
        work_information: "Work information",
        agree_and_finish: "Agree and finish",
        summary_and_next_steps: "Summary and next steps",
      },
      introduction: {
        title: "How to apply for Temporary Disability benefits",
        contact: `<a href="https://www.nj.gov/labor/myleavebenefits/help/contact/" target="_blank">Contact us</a> if you need help filing your claim.`,
        infoReady: {
          title: "Get your information ready",
          personalInfo: "Personal information",
          contact: "Contact information (phone, email, address)",
          representativeTitle: "Optional: Choose a representative to help with your claim",
          representativeDetails: "You can name someone you trust to check your claim information for you. We will only share your claim details with you and this person. We'll ask for their name and birthdate.",
          leaveInfo: "Your leave information",
          reasonForLeave: "Why you need to take leave",
          leaveDates: "The last day you worked and your first day of medical leave",
          recovery: "When you recovered or expect to recover",
          providerInfo: "Your healthcare provider's name and contact information",
          otherBenefits: "Other benefits you may be getting",
          otherBenefitsDetail: "Tell us if you've applied for or are getting:",
          workersComp: "Workers' Compensation",
          ssdi: "Social Security Disability (SSDI or long term disability benefits)",
          ui: "Unemployment Insurance",
          outOfState: "Family/Medical Leave from another state",
          employment: "Your jobs in the last 18 months",
          employmentDetail: "For each employer, you'll need:",
          employerName: "Employer name and contact information",
          ein: "Employer identification number (find this on your W2 or paystub, or ask your employer)",
          employmentDates: "When you started and ended each job",
          currentEmployer: "For your current job(s)— your usual work schedule and any other payments you receive (like paid time off or pension payments)",
        },
        fillOut: {
          title: "Fill out and submit your application",
          time: "Plan for 15-20 minutes to complete the application",
          saved: "If you need to stop, we'll save your work for 14 days so you can come back and finish",
          deadline: "<strong>Important deadline:</strong> Apply within 30 days after your medical leave starts. If you miss this deadline, your benefits may be reduced or be denied.",
        },
        nextSteps: {
          title: "Contact your healthcare provider",
          claimNumber: "Write down your claim number—you'll see it after you submit. Keep it somewhere safe",
          m01: "Ask your healthcare provider to fill out form M01—- provider instructions at the end",
          otherTasks: "Check for other tasks you need to do. You may need to print 🖨️ and mail or fax some forms back to us",
        },
        privacy: "Your application information is private. It will be shared with other agencies if legally permitted, if required by court order, or with your consent. We take steps to protect your data by using a secure connection and encryption.",
        getStarted: "Get started",
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
          beforeAfterTitle: "Before and after your leave",
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
          whatsNext: "What's next?",
          howDelivered: `After we approve your claim, we’ll mail you a form. It will ask how you delivered (if you haven't already told us) and whether you need more time to recover. 
            <br><br>
            <ul>
              <li>You can receive 6 weeks to recover from vaginal birth</li>
              <li>You can receive 8 weeks to recover from C-section birth</li>
              <li>You can receive more with postpartum complications</li>
            </ul>
          `
        },
        lastWorkdayHint: "Your last day of work must be before your first day of disability leave.",
        recoveryDateHint: "The date you returned to work must be after your first day of disability leave.",
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
          causedByJob: "Was your {{disabilityTypeString}} caused by your job? (Could be a specific incident or happened over time)",
          workersCompClaim: `Have you or your employer filed a <a href="https://www.nj.gov/labor/workerscompensation/injured-worker-protections/index.shtml" target="_blank">Workers' Compensation Claim</a>, or do you plan to file one?`,
        },
      },
      otherBenefits: {
        title: "Other benefits",
        checkingForOverlaps: "Some benefit programs can't overlap with Temporary Disability, so we need to check if that applies to you.",
        areYouReceivingOrApplied: "Are you receiving or have you applied for any of the following benefits as of {{firstDayOfDisability}}?",
        areYouReceivingOrApplied_returned: "For the period from {{firstDayOfDisability}} to {{returnedToWorkDay}}, have you applied for or received any of the following?",
        noneOfTheAbove: "None of the above (most people choose this)",
        pendingLabel: "My application is still pending",
        stateLabel: "State or territory where you filed:",
        dateLabel: "What time period do your benefits cover?",
        startLabel: "Start",
        endLabel: "End",
        ssdi: {
          title: `Social Security Disability (Also called "SSDI." These are long term disability benefits handled by the federal <a href="https://www.ssa.gov/disability" target="_blank">Social Security Administration</a>).`,
          areYouSure: `Are you sure? Keep in mind, Social Security Disability benefits are different from <a href="https://www.ssa.gov/retirement" target="_blank">Social Security Retirement benefits</a> you receive at age 62 or older.`,
          followup: {
            title: "You answered yes to Social Security Disability",
            subtitle: "Social Security Disability",
            dateLabel: "Month your Social Security Disability (SSDI) benefits start:",
            hint: 'mm/01/yyyy',
          },
        },
        ui: {
          title: "Unemployment Insurance",
          followup: {
            title: "You answered yes to Unemployment Insurance",
            subtitle: "Unemployment Insurance",
          },
        },
        tdi: {
          title: "Family/Medical Leave from <strong>another state or U.S. territory</strong>",
          followup: {
            title: "You answered yes to Family/Medical leave from another state",
            subtitle: "Family/Medical Leave benefits from another state",
          },
        },
        employer: {
          title: "<strong>Employer or union-provided</strong> temporary disability benefits",
          followup: {
            title: "You answered yes to Temporary disability benefits from your employer",
            subtitle: "Disability from your employer",
            employerLabel: "Enter the employer or union that is paying you disability benefits.",
          },
        },
      },
      paymentInfo: {
        title: "Federal taxes",
        withholdTaxes: "Do you want to withhold federal income tax from your Temporary Disability benefits?",
        withholdTaxesHint: "Hint: Temporary Disability benefits count as income for federal taxes, so you may owe taxes when you file your return. You can choose to have money taken out of your benefits now to help cover those taxes later. If you're unsure how much to withhold, check your paystub for how much federal tax is usually taken out.",
        socSecAndMedicareWithheld: "Note: Social Security and Medicare taxes are already taken out of your payments.",
        withholdAmount: "How much would you like to have withheld?",
        withholdAmountHint: `
          * Minimum amount you can withhold is $20
          * Enter a whole dollar amount — no cents
          * This amount will be withheld each week
        `,
        lateReason: "Your disability began more than 30 days ago, on {{firstDayOfDisability}}. Please share why you're filing your claim later than expected.",
        reasonHint: "300 character limit",
        everyWeek: "every week",
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
