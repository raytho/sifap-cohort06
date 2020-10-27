/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const Context = createContext();

const Provider = ({ children }) => {
   const [isAuth, setIsAuth] = useState(() => {
      return window.sessionStorage.getItem('token');

   });
   // vamos a usar este estado para ocultar las rutas de authentication
   const [TFAToken, setTFAToken] = useState(() => {
      return window.sessionStorage.getItem('TFAToken');
   });
   const [userImg, setUserImg] = useState();
   const [userDeleted, setUserDeleted] = useState();
   const [initialConfig, setInitialConfig] = useState(false);
   // Value va a ser le objeto que vamos a poder acceder en toda la app
   const value = {
      isAuth,
      activateAuth: token => {
         setIsAuth(true)
         window.sessionStorage.setItem('token', token);
      },
      removeAuth : () => {
         setIsAuth(false)
         window.sessionStorage.removeItem('token');
      },
      setUser: userData => {
         window.sessionStorage.setItem('user', userData);
      },
      removeUser: () => {
         window.sessionStorage.removeItem('user');
      },
      TFAToken,
      activeTFAToken: token => {
         window.sessionStorage.setItem('TFAToken', token);
         setTFAToken(token);
      },
      removeTFAToken: () => {
         window.sessionStorage.removeItem('TFAToken');
      },
      setTypeTFA: type => {
         window.sessionStorage.setItem('typeTFA', type)
      },
      userImg,
      setUserImg: img => {
         setUserImg(img)
      },
      userDeleted,
      setUserDeleted: () => {
         if(userDeleted) {
            setUserDeleted(false)
         } else {
            setUserDeleted(true);
         }
      },
      initialConfig,
      setInitialConfig: config => {
         setInitialConfig(config)
      }
   }

   return (
      <Context.Provider value={value}>
         {children}
      </Context.Provider>
   )
}

export default {
   Provider,
   Consumer: Context.Consumer
};