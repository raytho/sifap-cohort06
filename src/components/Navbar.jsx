import React, { useState, useEffect }  from 'react';
import { Link, useHistory } from 'react-router-dom';

import AsideLogo from './AsideLogo'
import '../assets/styles/layout/Navbar.scss';
import '../assets/styles/Global.scss';

const Navbar = () => {

   const [element, setElement] = useState(1);
   const user = JSON.parse(window.sessionStorage.getItem('user'));
   const normalizeString = text =>
      text.replace(' ', '-').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");
   const history = useHistory();

   const handleClick = (id) => {
      setElement(id !== element ? id : element);
      document.getElementById(`item-functionality-${id}`).classList.add('isSelect');
      document.getElementById(`item-functionality-${id}`).classList.remove('liHover');
      if(element !== id) {
         document.getElementById(`item-functionality-${element}`).classList.remove('isSelect');
      }
      if (element === id) {
         document.getElementById(`item-functionality-${id}`).classList.add('isSelect');
      }
   }

   useEffect(() => {
      user.permissions.forEach(item => {
         switch (history.location.pathname) {
            case `/${item.name.replace(' ', '-').toLowerCase()}`:
               document.getElementById(`item-functionality-${item.idPermission}`)
                  .classList.add('isSelect');
               setElement(item.idPermission);
               break;
            default:
               break;
         }
      });
   }, [])


   return (
      <div className='Navbar'>
         <AsideLogo NavLogo/>
         <nav className='Navbar__nav'>
            <ul>
               {
                  user.permissions.map(item => (
                     <li
                        key={item.idPermission}
                        id={`item-functionality-${item.idPermission}`}
                        className='liHover'
                     >
                        <Link
                           to={normalizeString(item.name)}
                           onClick={() => handleClick(item.idPermission)}
                        >
                           <img src={item.urlIcon} alt={item.name}/>
                           <p>{item.name}</p>
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