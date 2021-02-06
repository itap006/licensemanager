import Home from 'pages/Home';
import Licenses from 'pages/Licenses';
import Navbar from 'pages/Navbar';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

interface Props {}

const Main = (props: Props) => {
  return (
    <div>
      <Navbar />
      <div className="content h-screen overflow-hidden relative">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/license/:id" component={Licenses} />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
