/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ShowPass from '../../assets/static/icon/ShowPass.png';

const FormNewPass = props => {

   const {
      handleSubmit,
      handleInputChange,
      passwordValidate,
      passwordVerifyValidate,
      form
   } = props;
   const [showPassword, setShowPassword] = useState(false);

   return (
      <div className='ResetPass__form'>
         <form onSubmit={handleSubmit}>
            <h2>Nueva contraseña</h2>
            <label htmlFor='password'>Verifica la contraseña: <i>*</i>
               <div className='ResetPass__password'>
                  <input
                        type={!showPassword ? 'password' : 'text'}
                        value={form.password}
                        name='password'
                        placeholder='Contraseña'
                        onChange={handleInputChange}
                     />
                  <button
                     type='button'
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
               <div className='ResetPass__password'>
                  <input
                        type={!showPassword ? 'password' : 'text'}
                        value={form.passwordVerify}
                        name='passwordVerify'
                        placeholder='Contraseña'
                        onChange={handleInputChange}
                     />
                  <button
                     type='button'
                     onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true)}
                  >
                     <img
                        src={ShowPass}
                        alt='Mostrar contraseña'
                     />
                  </button>
               </div>
               {passwordVerifyValidate &&
               <p className='alert-form'>
                  No coinciden las contraseñas
               </p>}
            </label>
            <div className='ResetPass__buttons'>
               <button type='submit'>Restablecer</button>
            </div>
         </form>
      </div>
   );
}

FormNewPass.propTypes = {
   handleSubmit: PropTypes.func,
   handleInputChange: PropTypes.func,
   form: PropTypes.object,
   passwordValidate: PropTypes.bool,
   passwordVerifyValidate: PropTypes.bool,
}

export default FormNewPass;