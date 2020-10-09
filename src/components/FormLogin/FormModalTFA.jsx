/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import cheque from '../../assets/static/icon/cheque.png';
import '../../assets/styles/components/Login/LoginModal.scss';

const FormModalTFA = (props) => {

   const {
      modalTFA,
      handleModalClose
   } = props;
   const [form, setValues] = useState(null)
   const [choise, setChoise] = useState(false)
   const history = useHistory()
   const handleChangeInput = e => {
      setValues(
         e.target.value,
      )
   }
   window.console.log(form)

   const handleAccepted = () => {
      window.console.log(form)
      if (form === null) {
         window.console.log('Escoja un método de autenticación');
         setChoise(true)
      }
      if (form === 'email') {
         window.console.log('Estamos en construcción');
         setChoise(false)

      }
      if (form === 'qr') {
         window.console.log('QR')
         history.push('/tfautenthication');
         setChoise(false)
      }
   }

   return (
      <Modal
         LoginModal
         isOpen={modalTFA}
         handleModalClose={handleModalClose}
      >
         <div className='LoginModal__container'>
            <button onClick={handleModalClose} className='LoginModal__close-button' type="submit">X</button>
            <img src={cheque} alt="cheque" />
            <h2>Elige el método de autenticación</h2>
            {choise && <p className='alert-form'>Escribe el país con el que iniciarás</p>}
            <form>
               <div className='LoginModal__radio'>
                  <label className='radio font-small'>
                     <input
                        type='radio'
                        name='auth'
                        value='qr'
                        onChange={handleChangeInput}
                     />
                     <span className='radiomark'> </span>
                     Google authenticator
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
               <button className='LoginModal__buttons' type='button' onClick={handleAccepted} >Aceptar</button>
            </form>
         </div>
      </Modal>
   );
}

FormModalTFA.propTypes = {
   handleModalClose: PropTypes.func,
   modalTFA: PropTypes.bool
}

export default FormModalTFA;