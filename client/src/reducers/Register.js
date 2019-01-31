import {register_Actions} from '../constants/Register'
import {register_Status} from '../constants/Register'
 const register_initialState = {
    register_status: register_Status.register_Create.NEW,

  };

  export default function (state = register_initialState, action) {
   console.log(action.type);
    switch(action.type) {
      case register_Actions.register_Create.NEW:// start fetching posts and set loading = true
        console.log("I am from Reduce New..");
        return { ...state, register_status: register_Status.register_Create.NEW};
      case register_Actions.register_Create.POST:// start fetching posts and set loading = true
        console.log("I am from Reduce Loading..");
        return { ...state, register_status: register_Status.register_Create.LOADING};
      case register_Actions.register_Create.CREATED:
         console.log("I am from Reducer created..");
        return {...state, register_status: register_Status.register_Create.SUCCESS}
      case register_Actions.register_Create.FAILURE:
         console.log("I am from Reduce Failure..");
        return {...state, register_status: register_Status.register_Create.FAILURE}
        case register_Actions.register_Create.EXISTING:
           console.log("I am from Reduce Failure..");
          return {...state, register_status: register_Status.register_Create.EXISTING}
default:
      console.log("default is firing")

        return {...state,register_status: register_Status.register_Create.NEW};

    }
  };
