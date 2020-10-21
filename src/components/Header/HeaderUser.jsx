/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Context } from '../../Context';
import Modal from '../Modal';

import '../../assets/styles/layout/Header.scss';

const HeaderUser = (props) => {

   const {
      img,
      logOut,
      modal,
      // handleModalClose
   } = props;
   const user = JSON.parse(window.sessionStorage.getItem('user'));

   return (
      <>
         <div className='Header__user-container'>
            <p>{user.firstName}</p>
            <div>
               <img src={img} alt='Foto usuario'/>
            </div>
            <ul className='Header__menu'>
               <li>
                  <p>{user.firstName}</p>
                  <p>{user.email}</p>
                  <p>{user.role}</p>
               </li>
               <li>
                  <Link to='/profile'>Perfil</Link>
               </li>
               <li>
                  <button type='button' onClick={logOut}>Salir</button>
               </li>
            </ul>
         </div>
         <Modal isOpen={modal}>
            <p className='Modal__loader'>Cargando...</p>
         </Modal>
      </>
   )
}

HeaderUser.propTypes = {
   name: PropTypes.string,
   img:  PropTypes.string,
   email:   PropTypes.string,
   rol:  PropTypes.string,
   logOut: PropTypes.func,
   modal: PropTypes.bool,
   // handleModalClose: PropTypes.func,
}

export default HeaderUser;