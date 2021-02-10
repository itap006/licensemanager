import Home from 'pages/Home';
import Licenses from 'pages/Licenses';
import Navbar from 'layout/Navbar';
import Organisations from 'pages/Organisations';
import POs from 'pages/POs';
import Products from 'pages/Products';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PPs from 'pages/PPs';
import GenerateToken from 'pages/GenerateToken';

interface Props {}

const Main = (props: Props) => {
  return (
    <div className="content h-screen overflow-hidden relative flex flex-col">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/generatetoken" component={GenerateToken} />
        <Route path="/products" component={Products} />
        <Route path="/organisations" component={Organisations} />
        <Route path="/productorganisations" component={POs} />
        <Route path="/productorganisation/:pId/:oId" component={PPs} />
        <Route path="/license/:id" component={Licenses} />
      </Switch>
    </div>
  );
};

export default Main;
