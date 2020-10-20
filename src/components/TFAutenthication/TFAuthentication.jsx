import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context';

import '../../assets/styles/components/TFAuthentication/TFAuthentication.scss';

const TFAuthentication = () => {

   const [form, setValues] = useState({
      one: '',
      two: '',
      three: '',
      four: '',
      five: '',
      six: '',
   });
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const [numValidate, setNumValidate] = useState(true);
   const [codeValidate, setCodeValidate] = useState(true);
   const [resend, setResend] = useState(true)
   const history = useHistory()
   const { activateAuth, removeTFAToken, setUser } = useContext(Context);
   const TFAToken = window.sessionStorage.getItem('TFAToken');
   const typeTFA = window.sessionStorage.getItem('typeTFA');
   const handleChandeInput = e => {
      const num = window.parseInt(e.target.value);
      setValues({
         ...form,
         [e.target.name]: e.target.value,
      });
      setResend(true);
      setCodeValidate(true);
      if(Number.isNaN(num)) {
         setNumValidate(false);
      } else {
         setNumValidate(true);
      }
   }


   const handleSubmit = e => {
      e.preventDefault();
      const code = (Object.values(form).join(''));
      if (numValidate) {
         const postData = async () => {
            try {
               await fetch(`${API}${typeTFA === 'qr' ? 'auth/two-factor' : 'auth/two-factor-mail' }`, {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': `bearer ${TFAToken}`,
                  },
                  body: JSON.stringify({
                     token: code,
                  })
               }).then(async response => {
                  if (response.status === 500) setCodeValidate(false)
                  const { token, user } = await response.json();
                  setUser(JSON.stringify(user));
                  setResend(true);
                  activateAuth(token);
                  removeTFAToken();
                  history.push('/emitir-facturas');
               })
            } catch(error) {
               window.console.log(error);
            }
         }
         postData();
      }
   }

   const sendMail = async () => {
      try {
         await fetch(`${API}auth/send-mail-code`, {
            method: 'POST',
            headers: {
               'Access-Control-Allow-Headers': 'content-type',
               'Authorization': `bearer ${TFAToken}`
            }
         }).then(response => {
            if(response.status === 200) {
               setResend(false);
               window.console.log('Revisa tu correo');
            }
         });
      } catch(error) {
         window.console.log(error);
      }
   }

   return (
      <main className='TFA'>
         <h2>
            <img src='https://i.imgur.com/FjzAcjI.png' alt='Logo Sifap'/>
         </h2>
         <form onSubmit={handleSubmit}>
            <div className='TFA__container-input'>
               <div>
                  <input
                     type='text'
                     value={form.one}
                     name='one'
                     onChange={handleChandeInput}
                     maxLength='1'
                  />
               </div>
               <div>
                  <input
                     type='text'
                     value={form.two}
                     name='two'
                     onChange={handleChandeInput}
                     maxLength='1'
                  />
               </div>
               <div>
                  <input
                     type='text'
                     value={form.three}
                     name='three'
                     onChange={handleChandeInput}
                     maxLength='1'
                  />
               </div>
               <div>
                  <input
                     type='text'
                     value={form.four}
                     name='four'
                     onChange={handleChandeInput}
                     maxLength='1'
                  />
               </div>
               <div>
                  <input
                     type='text'
                     value={form.five}
                     name='five'
                     onChange={handleChandeInput}
                     maxLength='1'
                  />
               </div>
               <div>
                  <input
                     type='text'
                     value={form.six}
                     name='six'
                     onChange={handleChandeInput}
                     maxLength='1'
                  />
               </div>
            </div>
            {!numValidate && <p>El código solo tiene números, por favor verifica</p>}
            {!codeValidate && <p>Parece que has ingresado otro código, por favor verifica</p>}
            {!resend && <h2>Código reenviado</h2>}
            <div className='TFA__container-button'>
            {
               typeTFA === 'email'
               ? <>
                  <button type='button' onClick={sendMail}>Reenviar código</button>
                  <button type='submit'>Autenticarme</button>
               </>

               : <button type='submit'>Autenticarme</button>
            }
            </div>
         </form>
      </main>
   );
}

export default TFAuthentication;