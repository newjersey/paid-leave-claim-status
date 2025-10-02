const resources = {
  en: {
    translation: {
      certification: {
        title: "Agree and finish",
        beforeSubmit: "Before you submit",
        alertText: `Be sure that all your answers are correct. You can <a href="/tdi_iam/TDI_PndClaim_Intro.aspx">review your entire application step by step</a> if you aren't sure. You'll need to contact the Division of Temporary Disability Insurance if anything important changes.`,
        certifyText: "By submitting, I certify:",
        agreement1: "I have answered all questions completely and truthfully to the best of my knowledge.",
        agreement2: "I could face fines and criminal charges if I purposefully provide false information or don't share crucial details that could impact my claim.",
        agreement3: "I will have to pay back any benefits I'm not entitled to or be subject to deductions of funds from future benefits.",
        agreement4: "I allow the Division of Temporary Disability Insurance to verify my Social Security number. I allow them to access any necessary medical, employment, and Social Security benefit entitlement information to determine my eligibility for benefits.",
        agreeAndSubmit: "Agree and submit application",
      },
      confirmation: {
        title: "You're almost done!",
        checkmark: "Checkmark",
        submitted: `Your information was submitted. <a id="applicationPdfDownload" class="usa-link">Download PDF</a>`,
        dueDate: "Best to complete by {{est_deadline_date}}",
        form_directions: `
            <ul class="usa-list">
              <li>Complete the form</li>
              <li>Write your 5-digit claim number on every page: <strong>{{claim_id}}</strong></li>
              <li>
                Submit by fax to (609) 984-4138 (fastest)
                <br><br>
                Or, mail to:
                <br>
                Division of Temporary Disability Insurance
                <br>
                P.O. Box 387
                <br>
                Trenton, NJ 08625-0387
              </li>
            </ul>
          `,
        m01: {
          title: "1. Follow up with your medical provider about Form M01",
          directions: "A qualified healthcare provider must confirm your disability. They will do this by completing Form M01 for you.",
          sample: {
            title: "Sample language to send to your provider",
            body: `Subject: Request for Medical Form M01 - Temporary Disability Claim
<br><br>
Dear {{provider_name}},
<br><br>
I'm requesting your help to complete Form M01 for my New Jersey Temporary Disability Insurance claim (Claim ID: {{claim_id}}, DOB: {{user_dob}}). The easiest way to submit it is online at www.nj.gov/labor/MedicalApplicationTDI using this Online Form ID: {{online_form_id}}. Fill out the required medical information and submit online. 
<br><br>
Please submit the form by {{est_deadline_date}} to avoid delays on my claim. Thank you for your help.
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
        },
        c01Award: {
          title: "Fax or mail your verification form (C01)",
          download_button: "Download Form C01 (PDF)",
        },
        w01: {
          title: "Fax or mail your Workers' Compensation form (Form W01)",
          download_button: "Download Form W01 (PDF)",
        },
        v01: {
          title: "Fax or mail your Identity Verification form (Form V01)",
          download_button: "Download Form V01 (PDF)",
        },
        moreInfo: {
          title: "Good to know",
          mail: {
            title: "As we process your claim",
            current_address: "We will mail forms to:",
            change_address: `<strong>Need to change your address?</strong> <a href="{{hostname}}/tdi/AddressChange_Introduction.aspx">Submit a change of address form.</a>`,
          },
          next: {
            title: "What happens next?",
            read_doc: `Read through <a href="">"What happens when I apply?"</a> on myLeaveBenefits.nj.gov`,
            check_status: `<a href="">Check your claim status</a> (note: it takes several days for your first status update)`,
          },
        },
      },
    }
  },
};

export default resources;
