import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { initiateCheckout } from '../actions';

function Header({ auth, initiateCheckout }) {
  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                initiateCheckout();
              }}
            >
              <button id="submit" role="link" className="btn">
                Add Credits
              </button>
            </form>
          </li>,
          <li key="2" style={{ margin: '0 10px' }}>
            Credits: {auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth ? '/surveys' : '/'} className="left brand-logo">
          Emaily
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
}

Header.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  initiateCheckout: PropTypes.func.isRequired,
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { initiateCheckout })(Header);
