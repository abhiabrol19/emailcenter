import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

function Dashboard() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Emaily Dashboard!</h1>
      Collect feedback from your users
      <div>
        <SurveyList />
      </div>
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
