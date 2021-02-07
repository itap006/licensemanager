import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Toast from 'Utils/Toast';
import { loginSuccess } from 'redux/actions';
import { useMutation } from 'react-query';
import axios from 'axios';
import Input from 'components/Input';
import Button from 'components/Button';

const Login = ({ success, authenticated, location }: any) => {
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

  if (authenticated) return <Redirect to={location.state?.referrer.pathname || '/'} />;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="">
        <form onSubmit={handleSubmit} className="logininside">
          <div className="mb-2 text-center">Login</div>
          <Input
            className="w-60 mb-2"
            onChange={(e) => handleChange(e, 'user')}
            type="text"
            label="Username"
            placeholder="Username"
          />
          <Input
            className="w-60 mb-2"
            onChange={(e) => handleChange(e, 'pass')}
            type="password"
            label="Password"
            placeholder="Password"
          />
          <div className="flex justify-center">
            <Button variant="blue" type="submit">
              {isLoading ? 'logging in' : 'login'}
            </Button>
          </div>
          <div>(USER: admin@gmail.com PASS: admin)</div>
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
  };
};

export default connect(mapState, mapDispatch)(Login);
