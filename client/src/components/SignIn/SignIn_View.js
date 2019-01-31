
import React, { Component } from "react";
import { connect } from "react-redux";

import Login_Failure from './SignIn_Failure'
import Login_Loading from './SignIn_loading'
import Login_signIn from './SignIn_New'
import LoginSuccess from './SignIn_Success'
import { loginServer } from '../../server/LoginServer';
import { login_Status } from '../../constants/Login';
import { login_Actions } from '../../constants/Login';
import {register_Status} from '../../constants/Register';
import {register_Actions} from '../../constants/Register';
import CreateAccount from '../CreateAccount/Create_View';
import { withRouter } from 'react-router';


const mapStateToProps = (state) => {
  console.log("****************************state:", state);
  return {
    login_status: state.login_Reducer.login_status,
    userid: state.login_Reducer.userid,
    register_status: state.register_Reducer.register_status,
    
  };
  
};

const mapDispatchToProps = (dispatch) => {

  return {

    handleSignIn: (email,password) => { dispatch(loginServer.handleSignIn(email,password)) },
    handleBackClick : (usertoken) =>{dispatch(loginServer.handleSignOut(usertoken)) },
    CreateButton : () =>{ dispatch({ type: register_Actions.register_Create.NEW }) }
  };
};

class LoginView extends Component {

  getScreen(status) {
    console.log("I am from login Component getScreen: " + status);
      switch (status) {
        case login_Status.login_SignIn.NEW:
          return (
            <Login_signIn handleSignIn={this.props.handleSignIn} CreateButton={this.props.CreateButton} />
          );
          break;
        case login_Status.login_SignIn.SIGN0UT:
          return (
            <Login_signIn handleSignIn={this.props.handleSignIn} CreateButton={this.props.CreateButton} />
          );
          break;
        case login_Status.login_SignIn.FAILURE:
          return (
            <Login_Failure />
          );
        break;
        case login_Status.login_SignIn.AUTHORIZED:
          return (
            <LoginSuccess handleBackClick={this.props.handleBackClick} />
          );
          break;
          case login_Status.login_SignIn.NOT_AUTHORIZED:
            return (
              
              <Login_signIn status={status} handleSignIn={this.props.handleSignIn} CreateButton={this.props.CreateButton} />
            );
            break;
          case login_Status.login_SignIn.LOADING:
            return (
              <Login_Loading />
            );
            break;
        default:
          break;
      }

    
  }

  render() {
    return (
      <div>
          {this.getScreen(this.props.login_status)}
          </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView));

