import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {logout} from '../../store/api-action';
import PropTypes from 'prop-types';

function Header(props) {
  const {authorizationStatus, onSignOutClick, avatar, email} = props;
  const isUserAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile"
                  to={isUserAuthorized ? AppRoute.FAVORITES : AppRoute.LOGIN}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"
                    style={
                      isUserAuthorized
                        ? ({
                          backgroundImage: `url(${avatar})`,
                          borderRadius: '10px',
                        })
                        : ({})
                    }
                  >
                  </div>
                  {
                    isUserAuthorized
                      ? <span className="header__user-name user__name">{email}</span>
                      : <span className="header__login">Sign in</span>
                  }
                </Link>
              </li>
              {
                isUserAuthorized && (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="#" onClick={onSignOutClick}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                )
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  email: PropTypes.string,
  onSignOutClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({authorizationStatus, userInfo}) => ({
  authorizationStatus,
  avatar: userInfo.avatarUrl,
  email: userInfo.email,
});

const mapDispatchToProps = (dispatch) => ({
  onSignOutClick() {
    dispatch(logout());
  },
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
