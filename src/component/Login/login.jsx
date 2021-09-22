import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {Formik, Form, Field,ErrorMessage} from 'formik';


import {login} from '../../funciones/user';
import {loginState} from '../../actions/index';

import swal from 'sweetalert';
import '../../styles/login.scss';
import heroe2 from '../../img/heroeLogin2.png';
import heroe1 from '../../img/heroeLogin1.png';

export default function Login(){
    
    const history= useHistory();
    const dispatch = useDispatch()

    return (
        <div className='div_form'>
            <img src={heroe1} alt='img fondo' className='div_form_img1'/>
            <img src={heroe2} alt='img fondo' className='div_form_img2' />
            <p className='div_form_p'>Inicio de Seccion</p>
            <Formik
                initialValues={{
                    email:'',
                    password:''
                }}
                validate={(valores)=>{
                    let errors={}
                    if(!valores.email) errors.email='Es necesario ingresar un email'
                    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) errors.email='El email no es valido'
                    
                    if(!valores.password) errors.password='Es necesario agregar una password'
                    if(!/^[A-Za-z0-9]{4,8}$/.test(valores.password)) errors.password='La contraseña debe contener letras y numeros'
                    if(valores.password.length<4 || valores.password.length>8) errors.password='la contraseña debe tener de 4 a 8 caracteres '
                    return errors
                }}
                onSubmit={async (values, {resetForm})=>{

                    let loginUser=await login(values.email,values.password);

                    resetForm();

                    if(loginUser.ok){
                        swal ( `¡${loginUser.msg}! ` , { 
                            icon: "error",
                            button : false , 
                        }); 

                    }else{
                        dispatch(loginState(loginUser))
                        history.push('/')
                    }
                }}
            >
                {({errors})=>(
                    <Form className='form' autoComplete="off">
                        <div className='form_div'>
                            <p className='form_div_p'>Email</p>
                            <Field
                            className='form_div_i'
                                type='email' 
                                placeholder='correo@correo.com' 
                                id='email' 
                                name='email' 
                            />    
                            <ErrorMessage name='email' component={()=><p className='form_div_error'>{errors.email}</p>}/>
                        </div>
                        <div className='form_div'>
                            <p className='form_div_p'>Password</p>
                            <Field
                            className='form_div_i'
                                type='password' 
                                id='password'                                
                                name='password' 

                            />   
                             <ErrorMessage name='password' component={()=><p className='form_div_error'>{errors.password}</p>}/> 
                  
                        </div>
                        {!errors.email && !errors.password && <button type='submit' className='form_button'>Enviar</button>}
                    </Form> 
                )}
            </Formik>
           
        </div>

    )
}