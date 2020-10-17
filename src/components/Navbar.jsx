import React, { useState }  from 'react';
import { Link } from 'react-router-dom';

import AsideLogo from './AsideLogo'
import '../assets/styles/layout/Navbar.scss';
import '../assets/styles/Global.scss';
import mockFunct from '../../mockFunct';

const Navbar = () => {

   const [element, setElement] = useState(1)

   const handleClick = (id) => {

      setElement(id !== element ? id : element)
      document.getElementById(`item-functionality-${id}`).classList.add('isSelect');
      document.getElementById(`item-functionality-${id}`).classList.remove('liHover');

      if(element !== id) {
         document.getElementById(`item-functionality-${element}`).classList.remove('isSelect')
      }

      if (element === id) {
         document.getElementById(`item-functionality-${id}`).classList.add('isSelect');
      }

   }

   window.onload = (e) => {
      switch (e.target.location.pathname) {
         case '/bill':
            document.getElementById(`item-functionality-${1}`).classList.add('isSelect');
            setElement(1);
            break;
         case '/history':
            document.getElementById(`item-functionality-${2}`).classList.add('isSelect');
            setElement(2);
            break;
         case '/statistics':
            document.getElementById(`item-functionality-${3}`).classList.add('isSelect');
            setElement(3)
            break;
         case '/customers':
            document.getElementById(`item-functionality-${4}`).classList.add('isSelect');
            setElement(4);
            break;
         case '/role-manage':
            document.getElementById(`item-functionality-${5}`).classList.add('isSelect');
            setElement(5);
            break;
         case '/c-fiscales':
            document.getElementById(`item-functionality-${6}`).classList.add('isSelect');
            setElement(6);
            break;
         default:
            break;
      }
   }

   return (
      <div className='Navbar'>
         <AsideLogo NavLogo/>
         <nav className='Navbar__nav'>
            <ul>
               {
                  mockFunct.functionalitys.map(item => (
                     <li key={item.id} id={`item-functionality-${item.id}`} className='liHover'>

                        <Link to={item.path} onClick={() => handleClick(item.id)}>
                           <img src={item.icon} alt={item.type}/>
                           <p>{item.type}</p>
                        </Link>

                     </li>
                  ))
               }
            </ul>
         </nav>

      </div>
   );
};

export default Navbar;