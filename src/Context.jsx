/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const Context = createContext();

const Provider = ({ children }) => {
   const [isAuth, setIsAuth] = useState(false);
   // Value va a ser le objeto que vamos a poder acceder en toda la app
   const value = {
      isAuth,
      activateAuth: () => {
         setIsAuth(true)
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