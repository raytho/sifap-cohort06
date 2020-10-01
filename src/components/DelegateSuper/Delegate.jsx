/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Title from '../Title';
import iconDelegateSuper from '../../assets/static/icon/delegate.png';

const propsDelegateSuper = {
   title: 'Delegar Super Administrador',
   icon: iconDelegateSuper,
   alt: 'Icono Delegar SuperAdmin'
}

const Delegate = ({ children }) => {

   return (
      <>
         <Title {...propsDelegateSuper} />
         {children}
      </>
   );
};

export default Delegate;