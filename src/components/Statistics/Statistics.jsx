/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Title from '../Title';
import '../../assets/styles/components/Statistics/Statistics.scss';
import iconStatistics from '../../assets/static/icon/stats.png';

const propsStatistics = {
   title: 'Estadísticas',
   icon: iconStatistics,
   alt: 'Icono Estadísticas'
}

const Statistics = () => {

   return (
      <>
         <Title {...propsStatistics} />
         <div className='Statistics'>
            <div className='Statistics__header'> 
               <h2>Estadísticas generales de Sifap</h2>
            </div>
            <div className='Statistics__iframe'>
            <p>Cargando...</p>
               <iframe
                  src='https://datastudio.google.com/embed/reporting/ca6ffff8-c5d7-4a78-b949-7b6334a87e63/page/H0AlB'
                  title='statistics'
               />
            </div>
         </div>
      </>
   );
};

export default Statistics;