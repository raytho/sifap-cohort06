/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const FormNewPass = (props) => {

   const {
      handleSubmit,
      handleInputChange,
      form
   } = props;
   return (
      <div className='ResetPass__form'>
         <form onSubmit={handleSubmit}>
            <h2>Nueva contraseña</h2>
            <label htmlFor='password'> Nueva contraseña: <i>*</i>
               <input
                  type='password'
                  name='password'
                  value={form.password}
                  placeholder='Contraseña'
                  onChange={handleInputChange}
                 />
            </label>
            <label htmlFor='passwordVerify'> Confirmar contraseña: <i>*</i>
               <input
                  type='password'
                  name='passwordVerify'
                  value={form.passwordVerify}
                  placeholder='Confirma contraseña'
                  onChange={handleInputChange}
                 />
            </label>
            <button type='submit'>Reestablecer</button>
         </form>
      </div>
   );
}

FormNewPass.propTypes = {
   handleSubmit: PropTypes.func,
   handleInputChange: PropTypes.func,
   form: PropTypes.object,
}

export default FormNewPass;