import { Field } from 'react-final-form';

function SurveyField({ name, label, placeholder, autocomplete }) {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div>
          <label>{label}</label>
          <input
            {...input}
            type="text"
            placeholder={placeholder}
            autoComplete={autocomplete}
          />
          {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
      )}
    </Field>
  );
}

export default SurveyField;
