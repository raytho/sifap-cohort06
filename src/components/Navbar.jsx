import React from 'react';

import '../assets/styles/components/Navbar.scss';
import DEFAULT_ICON from '../assets/static/iconos/invoices-white.png';

const DEFAULT_LOGO = 'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Feb79fabd-7291-4870-9463-e5ce096f673e%2FSIFAP_logo.png?table=block&id=266a1e1e-4e2a-4fd4-854b-33e9c15e56b2&width=250&userId=27791eab-1eed-4e20-b487-9746088f2e30&cache=v2'

const Navbar = () => {

   return (
      <div className='Navbar'>
         <div className='Navbar__logo'>
            <div>
               <h1>
                  <img src={DEFAULT_LOGO} alt='Logo' />
               </h1>
            </div>
         </div>

         <nav className='Navbar__nav'>
            <ul>
               {
                  [1, 2, 3, 4, 5, 6, 7].map(item => (
                     <li key={item}>
                        <img src={DEFAULT_ICON} alt='Icono de la funcionalidad'/>
                        <p>Emitir Facturas</p>
                     </li>
                  ))
               }
            </ul>
         </nav>

      </div>
   );
};

export default Navbar;