/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ConfirmSendModal from './ConfirmSendModal';


const FormResetPass = (props) => {

   const {
      handleInputChange,
      handleSubmit,
      form,
      emailValidate,
      notEmail,
      handleModalClose,
      modal
   } = props;

   return (
      <div className='ResetPass__form'>
         <form onSubmit={handleSubmit}>
            <h2>Reestablecer tu contraseña</h2>
            <label htmlFor='email'> Correo: <i>*</i>
               <input
                  type='email'
                  name='email'
                  value={form.email}
                  placeholder='ejemplo@correo.com'
                  onChange={handleInputChange}
               />
               {!emailValidate && <p className='alert-form'>Este campo es obligatorio</p>}
               {notEmail && <p className='alert-form'>No hay una cuenta con ese correo</p>}
            </label>
            <div className='ResetPass__buttons'>
               <button type='submit'>Restablecer</button>
            </div>
            <p className='ResetPass__redirect'> <Link to='/login'> Iniciar sesión</Link></p>
         </form>
         <ConfirmSendModal
            modal={modal}
            handleModalClose={handleModalClose}
          />
      </div>
   )
}

FormResetPass.propTypes = {
   handleInputChange: PropTypes.func,
   handleSubmit: PropTypes.func,
   handleModalClose: PropTypes.func,
   form: PropTypes.object,
   emailValidate: PropTypes.bool,
   notEmail: PropTypes.bool,
   modal: PropTypes.bool
}

export default FormResetPass;