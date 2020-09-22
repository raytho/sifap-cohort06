/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Title from './Title';

import iconManageCFiscales from '../assets/static/icon/manage-cf.png';

const propsManageCFiscales = {
   title: 'Control de Comprobantes Fiscales',
   icon: iconManageCFiscales,
   alt: 'Icono de Control de Comprobrantes Fiscales'
}

const ManageCFiscales = () => {

   return (
      <div className='Role'>
      <Title {...propsManageCFiscales} />
         Manejador de Control de comprobantes fiscales
      </div>
   );
};

export default ManageCFiscales;