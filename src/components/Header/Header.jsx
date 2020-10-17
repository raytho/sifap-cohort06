import React, { useContext } from 'react';
import { Context } from '../../Context';
import HeaderUserContainer from './HeaderUserContainer';
import '../../assets/styles/layout/Header.scss';



const Header = () => {
   const { isAuth } = useContext(Context);
   return (
   <header className='Header'>

      <div className='Header__container'>
         <a href='/'>
            Ayuda
         </a>

         <div  className='Header__user'>
         {isAuth ? <HeaderUserContainer/> : null}
         </div>

      </div>
   </header>
   );
}
export default Header;