import React, { useContext } from 'react';
import { Context } from '../../Context';
import HeaderUser from './HeaderUser';
import '../../assets/styles/layout/Header.scss';

const DEFAULT_IMG_USER = 'https://i.imgur.com/JlR3iZD.png';
const DEFAULT_NAME = 'Daniel Santos'
const DEFAULT_EMAIL = 'dsantos@tacos.com'
const DEFAULT_ROL = 'Empleado'

const Header = () => {
   const { isAuth } = useContext(Context);
   return (
   <header className='Header'>

      <div className='Header__container'>
         <a href='/'>
            Ayuda
         </a>

         <div  className='Header__user'>
         {isAuth
            ? <HeaderUser
               name={DEFAULT_NAME}
               img={DEFAULT_IMG_USER}
               email={DEFAULT_EMAIL}
               role={DEFAULT_ROL}
               />
            : null}
         </div>

      </div>
   </header>
   );
}
export default Header;