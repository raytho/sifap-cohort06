/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const Context = createContext();

const Provider = ({ children }) => {
   const [isAuth, setIsAuth] = useState(() => {
      return window.sessionStorage.getItem('token');

   });
   const [user, setUser] = useState({})
   // Value va a ser le objeto que vamos a poder acceder en toda la app
   const value = {
      isAuth,
      activateAuth: token => {
         setIsAuth(true)
         window.sessionStorage.setItem('token', token)
      },
      user,
      getUser: userData => {
         setUser(userData)
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