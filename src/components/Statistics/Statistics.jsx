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
            <div className='Statistics__header'> </div>
            <div className='Statistics__iframe'>
               <iframe
                  src='https://datastudio.google.com/embed/reporting/016bfee4-f538-4dfa-a20d-6eee39a079e7/page/H0AlB'
                  title='statistics'
               />
            </div>
         </div>
      </>
   );
};

export default Statistics;