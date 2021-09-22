import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {Formik, Form, Field,ErrorMessage} from 'formik';

import {getHeroe} from '../../actions/index';
import {logoutState } from '../../actions/index';


import '../../styles/navBar.scss';


export default function NavBar() {
    const dispatch = useDispatch()
    const history= useHistory()


    function close(){
        dispatch(logoutState());
        history.push('/login');
    }

    return (
        
        <div className='navBar'>
            <Formik 
                initialValues={{
                    state:''
                }}
                validate={(valores)=>{
                    let errors={}
                    if(!valores.state) errors.state='El campo no puede estar vacio';

                    return errors
                }}
                onSubmit={async (values, {resetForm})=>{

                    dispatch(getHeroe(values.state))

                    resetForm();
                }}
            >
                 {({errors})=>(
                    <Form className='navBar_form' autoComplete="off">
                        <div className='navBar_form_div'>
                            <button type='submit' className='navBar_form_div_button'>Seach</button>                
                            <Field placeholder='heroe...' name='state' id='state' type='text' className='navBar_form_div_i' />
                        </div>
                        <ErrorMessage name='state' component={()=><p className='navBar_form_error'>{errors.state}</p>}/> 
                    </Form> 
                )}
            </Formik>
            <div className='navBar_close'>
                <button onClick={()=>close()} className='navBar_close_button'>Logout</button>
            </div>
        </div>
    )
}