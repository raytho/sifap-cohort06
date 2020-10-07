/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import cheque from '../../assets/static/icon/cheque.png';

const FormModalTFA = (props) => {

   const {
      modalTFA,
      handleCloseModal
   } = props;
   const [form, setValues] = useState({
      auth: '',
   })

   const handleChangeInput = e => {
      setValues({
         [e.target.name]: e.target.value,
      })
     window.console.log(e.target.value)
   }

   const handleSubmit = e => {
      e.preventDefault();

   }
   window.console.log(form)
   return (
      <Modal className="Modal__container" isOpen={modalTFA}>
         <button onClick={handleCloseModal} className='Modal__close-button' type="submit">X</button>
         <img src={cheque} alt="cheque" />
         <h1>Autenticación en dos pasos </h1>
         <p>¿Cómo quieres recibir el código?</p>
         <form onSubmit={handleSubmit}>
            <div className='Modal__radio'>
               <label className='radio font-small'>
                  <input
                     type='radio'
                     name='auth'
                     value='qr'
                     onChange={handleChangeInput}
                  />
                  <span className='radiomark'> </span>
                  QR - Google authenticator
               </label>
               <label className='radio font-small'>
                  <input
                     type='radio'
                     name='auth'
                     value='email'
                     onChange={handleChangeInput}
                  />
                  <span className='radiomark'> </span>
                  Correo electronico
               </label>
            </div>
            <button className="Modal__buttons" type="submit">Enviar</button>
         </form>
      </Modal>
   );
}

FormModalTFA.propTypes = {
   handleCloseModal: PropTypes.func,
   modalTFA: PropTypes.bool
}

export default FormModalTFA;