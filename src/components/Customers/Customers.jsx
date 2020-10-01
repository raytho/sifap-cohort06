/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Title from '../Title';

import iconCustomer from '../../assets/static/icon/customer.png';

const propsCustomer = {
   title: 'Clientes',
   icon: iconCustomer,
   alt: 'Icono Clientes'
}

const Customers = () => {

   return (
      <>
         <Title {...propsCustomer} />
         <div className='Role'>
            Manejador de Clientes
         </div>
      </>
   );
};

export default Customers;