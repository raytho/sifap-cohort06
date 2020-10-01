/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Title from '../Title';

import iconBill from '../../assets/static/icon/bill.png';

const propsBill = {
   title: 'Emitir Facturas',
   icon: iconBill,
   alt: 'Icono Factura'
}

const Bill = () => {

   return (
      <>
         <Title {...propsBill} />
         <div className='Role'>
            Manejador de Facturas
         </div>
      </>
   );
};

export default Bill;