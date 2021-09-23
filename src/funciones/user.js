import axios from 'axios';

export async function login(email,password){
  try {
    let loginUser= await axios.post(`http://challenge-react.alkemy.org/`, {
      email,password
    });

    return loginUser.data.token;

  } catch (error) {

    return Number(`${error}`.split('code')[1]) === 401 ? {ok:true,msg:'Usuario o contraseña invalidos'} : {ok:true, msg: 'Ah ocurrido un error, intente mas tarde'}
  }
}