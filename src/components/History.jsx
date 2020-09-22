/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Title from './Title';

import iconHistory from '../assets/static/icon/history.png';

const propsHistory = {
   title: 'History',
   icon: iconHistory,
   alt: 'Icono History'
}

const History = () => {

   return (
      <div className='History'>
         <Title {...propsHistory} />
         Manejador de History
      </div>
   );
};

export default History;