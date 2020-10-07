/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const Context = createContext();

const Provider = ({ children }) => {
   const [isAuth, setIsAuth] = useState(() => {
    //  Estado inicila el token si lo hay
     return true
   });
   // Value va a ser le objeto que vamos a poder acceder en toda la app
   const value = {
      isAuth,
      activateAuth: token => {
         setIsAuth(true)
        window.sessionStorage.setItem('token', token)
      },
      removeAuth: () => {
        setIsAuth(false)
        window.sessionStorage.removeItem('token')
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