/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Title from './Title';

import iconDelegateSuper from '../assets/static/icon/delegate.png';

const propsDelegateSuper = {
   title: 'Delegar Super Administrador',
   icon: iconDelegateSuper,
   alt: 'Icono Delegar SuperAdmin'
}

const DelegateSuper = () => {

   return (
      <div className='Role'>
      <Title {...propsDelegateSuper} />
         Manejador de Delegar super admin
      </div>
   );
};

export default DelegateSuper;