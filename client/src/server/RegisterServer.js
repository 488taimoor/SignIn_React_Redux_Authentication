
import {register_Actions} from '../constants/Register'
import store from '../store/index'
import {ROOT_URL} from '../constants/config';

export const registerServer = {
handleRegister: handleRegister
}

export function handleRegister(username,email,password)
{
  
  var user ={'username':username,'email': email,'password':password}
  console.log('SignupData', user)

  const postRequest =  fetch(ROOT_URL+'/api/Accounts/Register', {
        method: 'POST',
        headers: {'Content-Type':'application/json;charset=UTF-8'},
         mode: 'cors',
        body: JSON.stringify(user)
   }).then((response)=>{
    console.log('********'+response.status);
    response.json().then(data=>{
      console.log("data:......" + data.registerStatus )
    if(data.registerStatus=='failure'){
      store.dispatch({type:register_Actions.register_Create.FAILURE,payload:data});
      return ;
      }
    else if(data.registerStatus=='created') {
      store.dispatch({type:register_Actions.register_Create.CREATED,payload:data});
      return ;
    }
    else if(data.registerStatus=='existing') {

      store.dispatch({type:register_Actions.register_Create.EXISTING,payload:data});
      return ;
    }


     });
   })


return {type:register_Actions.register_Create.NEW,payload:'none'};

};
