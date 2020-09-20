/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import '../assets/styles/App.scss';

import iconRoles from '../assets/static/iconos/proceso.png';

import Layout from '../components/Layout';
import RoleManage from '../components/RoleManage';

const propsRole = {
   title: 'Roles',
   icon: iconRoles,
   alt: 'Icono roles'
}

const App = () => (
   <Layout {...propsRole} >
      <RoleManage  />
   </Layout>
);

export default App;
