/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../Context';

import '../../assets/styles/layout/Header.scss';

const HeaderUser = ({ name, img, email, rol}) => {

   const { user } = useContext(Context)
   window.console.log(user, 'user header');

   return (
      <>
         <div className='Header__user-container'>
            <p>{name}</p>
            <div>
               <img src={img} alt='Foto usuario'/>
            </div>
            <ul className='Header__menu'>
               <li>
                  <p>{name}</p>
                  <p>{email}</p>
                  <p>{rol}</p>
               </li>
               <li>
                  <a href='/profile'>Perfil</a>
               </li>
               <li>
                  <a href='/'>Salir</a>
               </li>
            </ul>
         </div>
      </>
   )
}

HeaderUser.propTypes = {
   name: PropTypes.string,
   img:  PropTypes.string,
   email:   PropTypes.string,
   rol:  PropTypes.string,
}

export default HeaderUser;