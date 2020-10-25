/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes, { shape } from 'prop-types';
import RegisterConfirmModal from './RegisterConfirmtionModal';

import ShowPass from '../../assets/static/icon/ShowPass.png';

const FormRegister = (props) => {
   const {
      form,
      handleChangeInput,
      handleModalClose,
      handleSubmit,
      emailValidate,
      passwordValidate,
      countryValidate,
      nameValidate,
      fiscalIdValidate,
      passwordVerify,
      countries,
      emailUsed,
      modalConfirm,
      invited
   } = props;
   const [showPassword, setShowPassword] = useState(false);
   return (
      <div className='SignUp__form'>
      <form onSubmit={handleSubmit}>
         <h2>Crear Cuenta</h2>
         {invited && <p className='alert-form'>No puedes registrarte sin invitación</p>}
         <label htmlFor='email'> Primer nombre: <i>*</i>
            <input
               type='text'
               value={form.firstName}
               name='firstName'
               placeholder='Memo / Memo SA'
               onChange={handleChangeInput}
            />
            {nameValidate && <p className='alert-form'>Debe tener más de 3 caracteres</p>}
         </label>
         <label htmlFor='email'> Identificación: <i>*</i>
            <input
               type='text'
               value={form.fiscalId}
               name='fiscalId'
               placeholder='101234132 / HASM0231-1'
               onChange={handleChangeInput}
            />
            {fiscalIdValidate && <p className='alert-form'>Debe tener más de 6 caracteres</p>}
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
            {emailUsed && <p className='alert-form'>Este correo ya en uso</p>}
         </label>
         <label htmlFor='password'>Contraseña: <i>*</i>
            <div className='SignUp__password'>
               <input
                     type={!showPassword ? 'password' : 'text'}
                     value={form.password}
                     name='password'
                     placeholder='Contraseña'
                     onChange={handleChangeInput}
                  />
               <button
                  type='button'
                  className='SignUp__show-pass'
                  onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true)}
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
         <label htmlFor='passwordVerify'>Verifica la contraseña: <i>*</i>
            <div className='SignUp__password'>
               <input
                     type={!showPassword ? 'password' : 'text'}
                     value={form.passwordVerify}
                     name='passwordVerify'
                     placeholder='Contraseña'
                     onChange={handleChangeInput}
                  />
               <button
                  type='button'
                  className='SignUp__show-pass'
                  onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true)}
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
               {
                  countries.map(item => <option key={item.idcountries} value={item.code}>{item.name}</option>)
               }
            </select>
            {countryValidate && <p className='alert-form'>Elije el país con el que iniciarás</p>}
         </label>
         <div className='SignUp__buttons'>
            {/* <button type='button'>Registrarse con Google</button> */}
            <button type='submit'>Crear</button>
         </div>
         {/* <p className='SignUp__redirect'>¿Ya tienes una cuenta? <Link to='/login'>Ingresar</Link></p> */}
      </form>
      <RegisterConfirmModal
         modalConfirm={modalConfirm}
         handleModalClose={handleModalClose}
      />
   </div>
   )
}

FormRegister.propTypes = {
   handleChangeInput: PropTypes.func.isRequired,
   handleModalClose: PropTypes.func.isRequired,
   handleSubmit: PropTypes.func.isRequired,
   countries: PropTypes.arrayOf(shape()).isRequired,
   emailValidate: PropTypes.bool.isRequired,
   passwordValidate: PropTypes.bool.isRequired,
   countryValidate: PropTypes.bool.isRequired,
   form: PropTypes.object.isRequired,
   nameValidate: PropTypes.bool.isRequired,
   fiscalIdValidate: PropTypes.bool.isRequired,
   passwordVerify: PropTypes.bool.isRequired,
   emailUsed: PropTypes.bool.isRequired,
   modalConfirm: PropTypes.bool.isRequired,
   invited: PropTypes.bool.isRequired
}

export default FormRegister;