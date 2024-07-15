import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, previousPage } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { validate } from '../../utils/formValidation';
import { submitSurvey } from '../../actions';

import SurveyField from './SurveyFormField';
import SurveyReviewField from './SurveyReview';

function SurveyForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const onSubmit = async (values) => {
    try {
      console.log(values);
      await dispatch(submitSurvey(values));
      navigate('/surveys'); // Then navigate
    } catch (error) {
      console.error('Error submitting survey', error);
    }
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, values, valid }) => (
          <form onSubmit={handleSubmit}>
            {page === 1 && (
              <>
                <SurveyField
                  name="title"
                  label="Survey Title"
                  placeholder="Title"
                  autocomplete="on"
                />
                <SurveyField
                  name="subject"
                  label="Subject Line - Email Subject Line"
                  placeholder="Subject"
                  autocomplete="on"
                />
                <SurveyField
                  name="body"
                  label="Survey Email Body"
                  placeholder="Body"
                  autocomplete="on"
                />
                <SurveyField
                  name="recipients"
                  label="Recipients - Comma Separated List of Emails"
                  placeholder="Recipients"
                  autocomplete="on"
                />
              </>
            )}
            {page === 2 && (
              <div>
                <h3>Review your entries</h3>
                <div>
                  <SurveyReviewField label="Title" value={values.title} />
                  <SurveyReviewField label="Subject" value={values.subject} />
                  <SurveyReviewField label="Body" value={values.body} />
                  <SurveyReviewField
                    label="Recipients"
                    value={values.recipients}
                  />
                </div>
              </div>
            )}
            <div className="buttons">
              {page === 1 && (
                <button
                  className="red btn-flat white-text"
                  type="button"
                  onClick={() => navigate('/surveys')}
                >
                  Go to Surveys
                </button>
              )}
              {page > 1 && (
                <button
                  className="orange btn-flat white-text"
                  type="button"
                  onClick={() => dispatch(previousPage())}
                >
                  Previous
                </button>
              )}
              {page < 2 && (
                <button
                  className="blue btn-flat right white-text"
                  type="button"
                  onClick={() => dispatch(nextPage())}
                  disabled={!valid}
                >
                  Next
                </button>
              )}
              {page === 2 && (
                <button
                  className="teal btn-flat right white-text"
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        )}
      />
    </div>
  );
}

export default SurveyForm;
