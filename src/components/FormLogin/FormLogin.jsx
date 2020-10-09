/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FormModalTFA from './FormModalTFA';

import '../../assets/styles/layout/Modal.scss';

import ShowPass from '../../assets/static/images/ShowPass.png';



const FormLogin = (props) => {

   const {
      form,
      handleChangeInput,
      handleSubmit,
      emailValidate,
      passwordValidate,
      modalTFA,
      handleModalClose,
      loader,
      // handleModalOpen
   } = props;

   const [showPass, setShowPass] = useState(false)

   return (
      <div className='Login__form'>
         <form onSubmit={handleSubmit}>
            <h2>Inicio de sesión</h2>
            <label htmlFor='email' > Correo: <i>*</i>
               <input
                  type='email'
                  value={form.email}
                  name='email'
                  placeholder='ejemplo@dominio.com'
                  onChange={handleChangeInput}
                  disabled={!loader}
               />
               {emailValidate && <p className='alert-form'>Formato de correo ejemplo@dominio.com</p>}
            </label>
            <label htmlFor='password'>Contraseña: <i>*</i>
               <div className='SignUp__password'>
                  <input
                     type={!showPass ? 'password' : 'text'}
                     value={form.password}
                     name='password'
                     placeholder='Contraseña'
                     onChange={handleChangeInput}
                     disabled={!loader}

                  />
                  <button
                     type='button'
                     className='SignUp__show-pass'
                     onClick={() => showPass ? setShowPass(false) : setShowPass(true)}
                  >
                     <img src={ShowPass} alt='Mostrar contraseña' />
                  </button>
               </div>
               {passwordValidate &&
                  <p className='alert-form'>
                        Incluya uno $@$!%*?&, un número, una letra mayúscula, una minúscula y de 8 a 15 caracteres
                  </p>
               }

            </label>

            <div className='Login__buttons'>
               <button type='button' disabled={!loader}>Iniciar con Google</button>
               <button type='submit' disabled={!loader}>Iniciar</button>
            </div>

            <div className='Login__forgot'>
               <p className='Login__redirect'> <Link to='/'>¿Olvidaste tu contraseña? </Link></p>
            <p className='Login__redirect'>¿Aún no tienes cuenta? <span> <Link to='/Register'>Crear cuenta</Link> </span> </p>
            </div>
         </form>
         <FormModalTFA
            modalTFA={modalTFA}
            handleModalClose={handleModalClose}
         />
      </div>
   )
}

FormLogin.propTypes = {
   modalTFA: PropTypes.bool,
   handleModalClose: PropTypes.func,
   // handleModalOpen: PropTypes.func,
   handleChangeInput: PropTypes.func,
   handleSubmit: PropTypes.func,
   emailValidate: PropTypes.bool,
   passwordValidate: PropTypes.bool,
   loader: PropTypes.bool,
   form: PropTypes.object
}

export default FormLogin;