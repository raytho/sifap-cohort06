import React from 'react';

import '../assets/styles/components/Header.scss'

const DEFAULT_IMG_USER = 'https://i.imgur.com/JlR3iZD.png';
const DEFAULT_NAME = 'Daniel Santos'
const DEFAULT_EMAIL = 'dsantos@tacos.com'
const DEFAULT_ROL = 'Empleado'

const Header = () => (
   <header className='Header'>

      <div className='Header__container'>
         <a href='/'>
            Ayuda
         </a>

         <div  className='Header__user'>
            <p>{DEFAULT_NAME}</p>
            <div>
               <img src={DEFAULT_IMG_USER} alt='Foto usuario'/>
            </div>
            <ul className='Header__menu'>
               <li>
                  <p>{DEFAULT_NAME}</p>
                  <p>{DEFAULT_EMAIL}</p>
                  <p>{DEFAULT_ROL}</p>
               </li>
               <li>
                  <a href='/'>Perfil</a>
               </li>
               <li>
                  <a href='/'>Salir</a>
               </li>
            </ul>
         </div>

      </div>
   </header>
);

export default Header;