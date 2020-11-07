/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context  } from '../../Context';

import Modal from '../Modal';
import cheque from '../../assets/static/icon/cheque.png';
import '../../assets/styles/components/Login/LoginModal.scss';

const FormModalTFA = (props) => {

   const {
      modalTFA,
      handleModalClose
   } = props;
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const { setTypeTFA } = useContext(Context);
   const TFAToken = window.sessionStorage.getItem('TFAToken');
   const [form, setValues] = useState(null);
   const [choise, setChoise] = useState(false);
   const history = useHistory();
   const handleChangeInput = e => {
      setValues(
         e.target.value,
      )
   }
   const sendMail = async () => {
      try {
         await fetch(`${API}auth/send-mail-code`, {
            method: 'POST',
            headers: {
               'Access-Control-Allow-Headers': 'content-type',
               'Authorization': `bearer ${TFAToken}`
            }
         });
      } catch(error) {
         window.console.log(error);
      }
   }
   const handleAccepted = () => {
      if (form === null) {
         setChoise(true)
      }
      if (form === 'email') {
         window.console.log('email');
         setChoise(false);
         setTypeTFA('email');
         history.push('/tfauthentication');
         sendMail();
      }
      if (form === 'qr') {
         window.console.log('QR');
         history.push('/tfauthentication');
         setTypeTFA('qr');
         setChoise(false);
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
            {choise && <p className='alert-form'>Elije el método de autenticación</p>}
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
            <button className='LoginModal__buttons' type='button'  onClick={handleAccepted}>Aceptar</button>
         </div>
      </Modal>
   );
}

FormModalTFA.propTypes = {
   handleModalClose: PropTypes.func,
   modalTFA: PropTypes.bool
}

export default FormModalTFA;