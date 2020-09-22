import React, { useState }  from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/components/Navbar.scss';
import '../assets/styles/Global.scss';
import mockFunct from '../../mockFunct';

const DEFAULT_LOGO = 'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Feb79fabd-7291-4870-9463-e5ce096f673e%2FSIFAP_logo.png?table=block&id=266a1e1e-4e2a-4fd4-854b-33e9c15e56b2&width=250&userId=27791eab-1eed-4e20-b487-9746088f2e30&cache=v2'


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
         case '/delegate-super':
            document.getElementById(`item-functionality-${7}`).classList.add('isSelect');
            setElement(7);
            break;
         default:
            document.getElementById(`item-functionality-${1}`).classList.add('isSelect');
            break;
      }
   }

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