/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Title from './Title';

import iconStatistics from '../assets/static/icon/stats.png';

const propsStatistics = {
   title: 'Estadísticas',
   icon: iconStatistics,
   alt: 'Icono Estadísticas'
}

const Statistics = () => {

   return (
      <div className='Statistics'>
         <Title {...propsStatistics} />
         Manejador de Statistics
      </div>
   );
};

export default Statistics;