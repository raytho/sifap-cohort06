import React from 'react';

import '../assets/styles/components/Header.scss'

const Header = () => (
   <header className='Header'>

      <div className='Header__container'>
         <a href='/'>
            Ayuda
         </a>

         <div>
            <div className='Header__user'>
               <p>Raymundo</p>
               <div>
                  <img src='' alt='Foto usuario'/>
               </div>
            </div>
         </div>

      </div>
   </header>
);

export default Header;