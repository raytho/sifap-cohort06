/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Title from './Title';

import '../assets/styles/components/RoleManage.scss';
import iconRoles from '../assets/static/icon/proceso.png';


const propsRole = {
   title: 'Roles',
   icon: iconRoles,
   alt: 'Icono roles'
}

const RoleManage = () => {

   return (
      <div className='Role'>
         <Title {...propsRole} />
         Manejador de roles
      </div>
   );
};

export default RoleManage;