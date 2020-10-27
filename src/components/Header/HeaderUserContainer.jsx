import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context';
import HeaderUser from './HeaderUser';

const DEFAULT_IMG_USER = 'https://i.imgur.com/JlR3iZD.png';
const DEFAULT_NAME = 'Daniel Santos'
const DEFAULT_EMAIL = 'dsantos@tacos.com'
const DEFAULT_ROL = 'Empleado'

const HeaderuserContainer = () => {

   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const { removeAuth, tokenTFA, removeUser } = useContext(Context);
   const history = useHistory();
   const [modal, setModal] = useState(false);
   const controller = new AbortController()

   const logOut = async () => {
      try {
         setModal(true)
         await fetch(`${API}auth/logout`, {
            method: 'GET',
            headers: {
               'Authorization': `Bearer ${tokenTFA}`
            },
            signal: controller.signal,
         }).then(response => {
            window.console.log(response);
            removeAuth();
            removeUser();
            history.push('/');
         });
      } catch(error) {
         window.console.log(error);
      }
      setModal(true)
   }

   // useEffect(() => controller.abort(), []);


   return(
      <HeaderUser
         name={DEFAULT_NAME}
         img={DEFAULT_IMG_USER}
         email={DEFAULT_EMAIL}
         role={DEFAULT_ROL}
         logOut={logOut}
         modal={modal}
      />
   );
}

export default HeaderuserContainer;