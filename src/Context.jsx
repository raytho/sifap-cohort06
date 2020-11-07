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
   const [userData, setUserData] = useState();
   const [userImg, setUserImg] = useState();
   const [userDeleted, setUserDeleted] = useState();
   const [initialConfig, setInitialConfig] = useState(false);
   const [userDetail, setUserDetail] = useState('');
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
      userData,
      setUser: user => {
         window.sessionStorage.setItem('user', user);
         setUserData(JSON.parse(user));
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
      },
      userDetail,
      getUserDetail: userDetailData => {
         setUserDetail(userDetailData)
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