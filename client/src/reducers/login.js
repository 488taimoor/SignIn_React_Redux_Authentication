import {login_Actions} from '../constants/Login'
import {login_Status} from '../constants/Login'
 const login_initialState = {
    login_status: login_Status.login_SignIn.NEW,
    userid:""
  };

  export default function (state = login_initialState, action) {
   console.log(action.type);
    switch(action.type) {

      case login_Actions.login_SignIn.NEW:// start fetching posts and set loading = true
        console.log("I am from Reduce new..");
        return { ...state, login_status: login_Status.login_SignIn.NEW};
      case login_Actions.login_SignIn.POST:// start fetching posts and set loading = true
        console.log("I am from Reduce Loading..");
        return { ...state, login_status: login_Status.login_SignIn.LOADING};
      case login_Actions.login_SignIn.AUTHORIZED:
         console.log("I am from Reducer authorized..");
        return {...state, login_status: login_Status.login_SignIn.AUTHORIZED,userid: action.payload.userid}
        case login_Actions.login_SignIn.NOT_AUTHORIZED:
           console.log("I am from Reducer not authorized..");
          return {...state, login_status: login_Status.login_SignIn.NOT_AUTHORIZED}
      case login_Actions.login_SignIn.FAILURE:
         console.log("I am from Reduce Failure..");
        return {...state, login_status: login_Status.login_SignIn.FAILURE}
      case login_Actions.login_SignIn.SIGN0UT:
        console.log("I am from Reduce signout..");
       return {...state, login_status: login_Status.login_SignIn.SIGN0UT}
        default:
      console.log("default is firing")

        return {...state};

    }
  };
