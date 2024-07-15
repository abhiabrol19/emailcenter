const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(keys.sendgridKey);
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const sendSurvey = async (recipients, survey) => {
  console.log('Preparing to send survey...');
  const msg = {
    personalizations: recipients.map((email) => ({
      to: [{ email: email.trim() }],
    })),
    from: { email: 'abhi.abrol34@gmail.com' },
    subject: survey.subject,
    content: [
      {
        type: 'text/html',
        value: surveyTemplate(survey),
      },
    ],
  };

  console.log('Message prepared, sending survey...');

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error(error.response.body);
  }
};

module.exports = sendSurvey;
