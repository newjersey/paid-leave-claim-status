const resources = {
  en: {
    translation: {
      certification: {
        title: "Agree and finish",
        beforeSubmit: "Before you submit",
        alertText: "Be sure that all your answers are correct. You can't change any of your answers after you click submit below. You must contact the Division of Temporary Disability Insurance to report any changes that may affect your claim.",
        certifyText: "By submitting, I certify:",
        agreement1: "I have answered all questions completely and truthfully to the best of my knowledge.",
        agreement2: "I could face fines and criminal charges if I purposefully provide false information or don't share crucial details that could impact my claim.",
        agreement3: "I will have to pay back any benefits I'm not entitled to or be subject to deductions of funds from future benefits.",
        agreement4: "I allow the Division of Temporary Disability Insurance to verify my Social Security number. I allow them to access any necessary medical, employment, and Social Security benefit entitlement information to determine my eligibility for benefits.",
        agreeAndSubmit: "Agree and submit application",
        saveAndLogout: "Save and logout",
        noteText: "<strong>Note:</strong> If you wait more than 14 days to come back and finish your application, you'll have to start over.",
      },
      confirmation: {
        title: "You're almost done!",
        checkmark: "Checkmark",
        submitted: `Your information was submitted. <a id="applicationPdfDownload" class="usa-link">You can download a copy of your application (PDF).</a>`,
        m01: {
          dueDate: "Best to complete by August 30, 2025",
          title: "1. Follow up with your medical provider about Form M01",
          directions: "A qualified healthcare provider must confirm your disability. They will do this by completing Form M01 for you.",
          expand_less: "Expand less",
          expand_more: "Expand more",
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
            copyButton: "Copy this starter message",
          },
        },
      },
    }
  },
};

export default resources;
