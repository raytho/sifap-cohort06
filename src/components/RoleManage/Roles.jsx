/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Title from '../Title';
import iconRoles from '../../assets/static/icon/proceso.png';



const propsRole = {
   title: 'Roles',
   icon: iconRoles,
   alt: 'Icono roles'
}


const Roles = ({ children }) => {

   return (
      <>
         <Title {...propsRole} />
         {children}
      </>
   )
}

export default Roles;