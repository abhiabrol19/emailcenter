import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchUser } from './actions';

import Header from './components/Header';

const Dashboard = () => <h2>Dashboard</h2>;

const SurveyNew = () => <h2>SurveyNew</h2>;

import Landing from './components/Landing';

function App({ fetchUser }) {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/surveys" element={<Dashboard />} />
            <Route path="/success" element={<Dashboard />} />
            <Route path="/surveys/new" element={<SurveyNew />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default connect(null, { fetchUser })(App);
