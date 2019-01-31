
import React from 'react';
import { HashRouter, BrowserRouter, Router, Route, Switch, Link } from 'react-router-dom';
import LoginView from './components/SignIn/SignIn_View';
import RegisterView from './components/CreateAccount/Create_View';


const Root = () => (

  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LoginView} />
      <Route exact path='/Register' component={RegisterView} />
     
    </Switch>
  </BrowserRouter >
);
export default Root;
