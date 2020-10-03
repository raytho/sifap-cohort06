/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import AsideLogo from '../../components/AsideLogo';
import SignUpSlides from './SignUpSlides';

import '../../assets/styles/components/SignUp/SignUp.scss';
import '../../assets/styles/utils/Alerts.scss';

const SignUp = (props) => {
   const {
      form,
      handleChangeInput,
      handleSubmit,
      emailValidate,
      passwordValidate,
      countryValidate,
      typeEmailValidate,
   } = props;
   const [typePass, setTypePass] = useState(false)
   window.console.log(form);
   return (
   <>
      <Header />
      <div className='SignUp__container'>
         <div className='SignUp__aside'>
            <AsideLogo SignUpLogo/>
            <div className='SignUp__form'>
               <form onSubmit={handleSubmit}>
                  <h2>Crear Cuenta</h2>
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
                  <div>
                     <p className='SignUp__type-email'>¿Qué tipo de correo es? <i>*</i></p>
                     <div className='SigUp__radio-email'>
                        <label className='radio font-small'>
                           <input
                              type='radio'
                              name='typeEmail'
                              value='institutional'
                              onChange={handleChangeInput}
                           />
                           <span className='radiomark'> </span>
                           Correo institucional
                        </label>
                        <label className='radio font-small'>
                           <input
                              type='radio'
                              name='typeEmail'
                              value='personal'
                              onChange={handleChangeInput}
                           />
                           <span className='radiomark'> </span>
                           Correo personal
                        </label>
                     </div>
                     {typeEmailValidate && <p className='alert-form'>¿Qué email tienes?</p>}
                  </div>
                  <label htmlFor='password'>Contraseña: <i>*</i>
                     <div className='SignUp__password'>
                        <input
                              type={!typePass ? 'password' : 'text'}
                              value={form.password}
                              name='password'
                              placeholder='Contraseña'
                              onChange={handleChangeInput}
                           />
                        <button
                           type='button'
                           className='SignUp__show-pass'
                           onClick={() => typePass ? setTypePass(false) : setTypePass(true)}
                        >
                           <img
                              src='https://img.icons8.com/ios-glyphs/60/000000/visible.png'
                              alt='Mostrar contraseña'
                           />
                        </button>
                     </div>
                     {passwordValidate &&
                     <p className='alert-form'>
                        Incluya uno $@$!%*?&, un número, una letra mayúscula, una minúscula y de 8 a 15 caracteres
                     </p>}
                  </label>
                  <label htmlFor='country'>País: <i>*</i>
                     <input
                        type='text'
                        value={form.country}
                        name='country'
                        placeholder='País'
                        onChange={handleChangeInput}
                     />
                     {countryValidate && <p className='alert-form'>Escribe el país con el que iniciarás</p>}
                  </label>
                  <div className='SignUp__buttons'>
                     <button type='button'>Registrarse con Google</button>
                     <button type='submit'>Crear</button>
                  </div>
                  <p className='SignUp__redirect'>¿Ya tienes una cuenta? <Link to='/logIn'>Ingresar</Link></p>
               </form>
            </div>
         </div>
         <SignUpSlides />
      </div>
   </>
   )
}

SignUp.propTypes = {
   handleChangeInput: PropTypes.func,
   handleSubmit: PropTypes.func,
   emailValidate: PropTypes.bool,
   passwordValidate: PropTypes.bool,
   countryValidate: PropTypes.bool,
   typeEmailValidate: PropTypes.bool,
   form: PropTypes.object
}
export default SignUp;
