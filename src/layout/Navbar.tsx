import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginFail } from 'redux/actions';

interface Props {}

const Navbar = (props: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="flex p-2 bg-color1 text-white">
      <Link to="/">License Manager</Link>
      <div className="ml-2 flex flex-1 justify-between">
        <Link to="/generatetoken">Generate Token</Link>
        <div className="cursor-pointer" onClick={() => dispatch(loginFail())}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Navbar;
