
import React, { Component } from "react";
import { connect } from "react-redux";

import Create_Failure from './Create_Failure'
import Create_Loading from './Create_Loading'
import Register from './Create_Register'
import Create_Success from './Create_Success'
import { registerServer } from '../../server/RegisterServer';
import { register_Status } from '../../constants/Register';
import { register_Actions } from '../../constants/Register'

const mapStateToProps = (state) => {
  console.log("****************************state:", state);
  return {
    register_status: state.register_Reducer.register_status,
  };
};

const mapDispatchToProps = (dispatch) => {

  return {

    handleRegister: (username,email,password) => { dispatch(registerServer.handleRegister(username,email,password)) },
    handleBackClick : () => { dispatch({ type: register_Actions.register_Create.NEW }) }
  };
};

class CreateView extends Component {
  constructor(props) {
      super(props);
     this.state = {};
     this.handleRegister = this.handleRegister.bind(this);

  }
componentWillMount(){
    var userToken= localStorage.getItem('userToken')
    console.log('userTokenData:',JSON.parse(userToken))
}
handleRegister(u,e,p){
  this.props.handleRegister(u,e,p)
}
  getScreen(status) {
    console.log("I am from register Component getScreen: " + status);
    switch (status) {
      case register_Status.register_Create.NEW:
        return (
          <Register handleRegister={this.props.handleRegister}  />
        );
        break;
      case register_Status.register_Create.FAILURE:
        return (
          <Create_Failure handleBackClick={this.props.handleBackClick} />
        );
      break;
      case register_Status.register_Create.SUCCESS:
        return (
          <Create_Success />
        );
        break;
        case register_Status.register_Create.LOADING:
          return (
            <Create_Loading />
          );
          break;
          case register_Status.register_Create.EXISTING:
            return (
              <Register status={status}  handleRegister={this.handleRegister}/>
            );
            break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
          {this.getScreen(this.props.register_status)}
          </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);


// style={{width: '800px', margin: '0 auto', overflow: 'auto', height: '700px'}}
