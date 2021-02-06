import React, { useState } from 'react';
// import './Login.scss';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Toast from 'Utils/Toast';
import { loginSuccess, loginFail } from 'redux/actions';

import { useMutation } from 'react-query';

import axios from 'axios';

const Login = ({ success, fail, authenticated, location }: any) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLoginAsync = async (data: any) => {
    const x = await axios.post('login', data);
    return x?.data;
  };

  const { mutate: handleLogin, isLoading } = useMutation(handleLoginAsync, {
    onSuccess: (data: any) => {
      success(data);
    },
    onError: () => {
      fail();
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!user) return Toast({ msg: 'Email required' });
    if (!pass) return Toast({ msg: 'Password required' });
    handleLogin({ email: user, password: pass });
  };

  const handleChange = (e: any, type: any) => {
    if (type === 'user') setUser(e.target.value);
    if (type === 'pass') setPass(e.target.value);
  };

  //the referrer means go back to the url you tried to visit. It was added in the protected route
  if (authenticated) return <Redirect to={location.state?.referrer.pathname || '/'} />;

  return (
    <div className="login">
      <div className="loginleft">
        <i className="feather icon-power"></i>
      </div>
      <div className="loginform">
        <form onSubmit={handleSubmit} className="logininside">
          <i className="feather icon-unlock"></i>
          <span className="loginname">Login</span>
          <input onChange={(e) => handleChange(e, 'user')} type="text" placeholder="Username" />
          <input onChange={(e) => handleChange(e, 'pass')} type="password" placeholder="Password" />
          <div className="loginsubmit">
            {!isLoading ? (
              <button type="submit">login</button>
            ) : (
              <div
                style={{
                  display: 'inline-block',
                  height: '20px',
                  width: '20px',
                }}
                className="slick-loader"
              ></div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const mapState = (state: any) => {
  return { authenticated: state.authenticated };
};

const mapDispatch = (dispatch: any) => {
  return {
    success: (data: any) => dispatch(loginSuccess(data)),
    fail: () => dispatch(loginFail()),
  };
};

export default connect(mapState, mapDispatch)(Login);
