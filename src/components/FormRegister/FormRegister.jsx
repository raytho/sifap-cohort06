/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ShowPass from '../../assets/static/images/ShowPass.png';

const FormRegister = (props) => {
   const {
      form,
      handleChangeInput,
      handleSubmit,
      emailValidate,
      passwordValidate,
      countryValidate,
      nameValidate,
      identifierValidate,
      passwordVerify
   } = props;
   const [showPass, setShowPass] = useState(false)

   return (
      <div className='SignUp__form'>
      <form onSubmit={handleSubmit}>
         <h2>Crear Cuenta</h2>
         <label htmlFor='email'> Nombre personal o empresarial: <i>*</i>
            <input
               type='text'
               value={form.name}
               name='name'
               placeholder='Memo Charol / Memo SA'
               onChange={handleChangeInput}
            />
            {nameValidate && <p className='alert-form'>Debe tener más de 3 caracteres</p>}
         </label>
         <label htmlFor='email'> Identificador personal o empresarial: <i>*</i>
            <input
               type='text'
               value={form.identifier}
               name='identifier'
               placeholder='101234132 / HASM0231-1'
               onChange={handleChangeInput}
            />
            {identifierValidate && <p className='alert-form'>Debe tener más de 6 caracteres</p>}
         </label>
         <label htmlFor='email'> Correo: <i>*</i>
            <input
               type='email'
               value={form.email}
               name='email'
               placeholder='ejemplo@correo.com'
               onChange={handleChangeInput}
            />
            {emailValidate && <p className='alert-form'>Formato de correo ejemplo@correo.com</p>}
         </label>
         <label htmlFor='password'>Contraseña: <i>*</i>
            <div className='SignUp__password'>
               <input
                     type={!showPass ? 'password' : 'text'}
                     value={form.password}
                     name='password'
                     placeholder='Contraseña'
                     onChange={handleChangeInput}
                  />
               <button
                  type='button'
                  className='SignUp__show-pass'
                  onClick={() => showPass ? setShowPass(false) : setShowPass(true)}
               >
                  <img
                     src={ShowPass}
                     alt='Mostrar contraseña'
                  />
               </button>
            </div>
            {passwordValidate &&
            <p className='alert-form'>
               Incluya uno $@$!%*?&, un número, una letra mayúscula, una minúscula y de 8 a 15 caracteres
            </p>}
         </label>
         <label htmlFor='password'>Verifica la contraseña: <i>*</i>
            <div className='SignUp__password'>
               <input
                     type={!showPass ? 'password' : 'text'}
                     value={form.passwordVerify}
                     name='passwordVerify'
                     placeholder='Contraseña'
                     onChange={handleChangeInput}
                  />
               <button
                  type='button'
                  className='SignUp__show-pass'
                  onClick={() => showPass ? setShowPass(false) : setShowPass(true)}
               >
                  <img
                     src={ShowPass}
                     alt='Mostrar contraseña'
                  />
               </button>
            </div>
            {passwordVerify &&
            <p className='alert-form'>
               No coinciden las contraseñas
            </p>}
         </label>
         <label htmlFor='country'>País: <i>*</i>
            <select name='country' onChange={handleChangeInput}>
               <option value=''>País</option>
               <option value='colombia'>Colombia</option>
               <option value='mexico'>México</option>
            </select>
            {countryValidate && <p className='alert-form'>Escribe el país con el que iniciarás</p>}
         </label>
         <div className='SignUp__buttons'>
            <button type='button'>Registrarse con Google</button>
            <button type='submit'>Crear</button>
         </div>
         <p className='SignUp__redirect'>¿Ya tienes una cuenta? <Link to='/login'>Ingresar</Link></p>
      </form>
   </div>
   )
}

FormRegister.propTypes = {
   handleChangeInput: PropTypes.func,
   handleSubmit: PropTypes.func,
   emailValidate: PropTypes.bool,
   passwordValidate: PropTypes.bool,
   countryValidate: PropTypes.bool,
   form: PropTypes.object,
   nameValidate: PropTypes.bool,
   identifierValidate: PropTypes.bool,
   passwordVerify: PropTypes.bool
}

export default FormRegister;