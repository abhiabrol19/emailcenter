import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

function SurveyList({ fetchSurveys, surveys }) {
  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  if (!surveys) {
    return <div>Loading...</div>;
  }

  const renderedSurveys = [...surveys].reverse().map((survey) => (
    <div className="card darken-1" key={survey._id}>
      <div className="card-content">
        <span className="card-title">{survey.title}</span>
        <p>{survey.body}</p>
        <p className="right">
          Sent On: {new Date(survey.dateSent).toLocaleDateString()}
        </p>
      </div>
      <div className="card-action">
        <a>Yes: {survey.yes}</a>
        <a>No: {survey.no}</a>
      </div>
    </div>
  ));

  return <div>{renderedSurveys}</div>;
}

const mapStateToProps = (state) => {
  return { surveys: state.surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
