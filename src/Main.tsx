import Home from 'pages/Home';
import Licenses from 'pages/Licenses';
import Navbar from 'layout/Navbar';
import Organisations from 'pages/Organisations';
import POs from 'pages/POs';
import Products from 'pages/Products';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

interface Props {}

const Main = (props: Props) => {
  return (
    <div className="content h-screen overflow-hidden relative flex flex-col">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/organisations" component={Organisations} />
        <Route exact path="/productorganisations" component={POs} />
        <Route exact path="/license/:pId/:oId" component={Licenses} />
      </Switch>
    </div>
  );
};

export default Main;
