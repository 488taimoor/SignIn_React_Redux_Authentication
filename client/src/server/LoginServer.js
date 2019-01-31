
import {login_Actions} from '../constants/Login'
import store from '../store/index'
import {ROOT_URL} from '../constants/config';

export const loginServer = {
handleSignIn: handleSignIn,
handleSignOut: handleSignOut
}

export function handleSignIn(email,password){

  var user ={'email':email,'password':password}
  console.log('userData@@', user)
  console.log('userdata@@',JSON.stringify(user))

  const postRequest =  fetch(ROOT_URL+'/api/Accounts/SignIn', {
        method: 'POST',
        headers: {'Content-Type':'application/json;charset=UTF-8'},
         mode: 'cors',
        body: JSON.stringify(user)
   }).then((response)=>{
    console.log('********'+response.status);
    response.json().then(data=>{
      console.log("data:......" + data.signInStatus )
      console.log(data.userid);
    if(data.signInStatus=='failure'){
      store.dispatch({type:login_Actions.login_SignIn.FAILURE,payload:data});
      return ;
      }
    else if(data.signInStatus=='authorized') {
      console.log('userAuthoriedData:', data)
      localStorage.setItem('userToken', JSON.stringify(data.token))

      store.dispatch({type:login_Actions.login_SignIn.AUTHORIZED,payload:data});
      return ;
    }
    else if(data.signInStatus == 'not_authorized'){
      store.dispatch({type:login_Actions.login_SignIn.NOT_AUTHORIZED,payload:data});
      return ;
    }

     });
   })


return {type:login_Actions.login_SignIn.POST,payload:'none'};

};




export function handleSignOut(usertoken)
{
  const postRequest =  fetch(ROOT_URL+'/api/Accounts/SignOut', {
        method: 'POST',
        headers: {'Content-Type':'application/json;charset=UTF-8'},
         mode: 'cors',
        body: usertoken
   }).then((response)=>{
    console.log('********'+response.status);
    response.json().then(data=>{
      console.log("data:......" + data )
      console.log(data);
    if(data.signOutStatus=='failure'){
      store.dispatch({type:login_Actions.login_SignIn.FAILURE,payload:data});
      return ;
      }
    else if(data.signOutStatus=='success') {

      store.dispatch({type:login_Actions.login_SignIn.SIGN0UT});
      return ;
    }

     });
   })


return {type:login_Actions.login_SignIn.POST};

};
