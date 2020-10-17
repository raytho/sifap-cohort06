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
   // const [user, setUser] = useState();
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
      TFAToken,
      activeTFAToken: token => {
         window.sessionStorage.setItem('TFAToken', token);
      },
      removeTFAToken: () => {
         window.sessionStorage.removeItem('authToken');
      },
      setTypeTFA: type => {
         window.sessionStorage.setItem('typeTFA', type)
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