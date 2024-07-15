export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  if (!values.subject) {
    errors.subject = 'Required';
  }

  if (!values.body) {
    errors.body = 'Required';
  }

  if (!values.recipients) {
    errors.recipients = 'Required';
  } else {
    const emails = values.recipients.split(',').map((email) => email.trim());
    const invalidEmails = emails.filter((email) => !validateEmail(email));
    if (invalidEmails.length) {
      errors.recipients = `These emails are invalid: ${invalidEmails.join(
        ', '
      )}`;
    }
  }

  return errors;
}
