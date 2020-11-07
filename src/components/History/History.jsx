/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types'
import Title from '../Title';

import '../../assets/styles/components/History/History.scss';

import iconHistory from '../../assets/static/icon/history.png';

const propsHistory = {
   title: 'Historial de Facturas',
   icon: iconHistory,
   alt: 'Icono History'
}

const History = (props) => {

   const {
      loader,
      history,
      noBill
   } = props;

   const user = JSON.parse(window.sessionStorage.getItem('user'));

   window.console.log(history)
   return (
      <>
         <Title {...propsHistory} />
         <div className='History'>
         <section className='History__panel'>
            <div className='History__header'>
               <div>
                  <p>Receptor</p>
                  <p>{
                     user.fiscalIdentifierName
                        ? user.fiscalIdentifierName
                        : 'Identificador fiscal:'
                  }</p>
                  <p>Fecha de creación</p>
                  <p>Factura</p>
               </div>
            </div>
            <article className='History__main'>
               <div className='History__item-container'>
                  <ul>
                     {
                        history.map((item, i) =>
                           <li key={i} className='History__item'>
                              <span>
                                 <p>{item.fullName}</p>
                                 <p>{item.fiscalId}</p>
                                 <p>{item.createdAt}</p>
                                 <a href={item.url} target='_blank' rel='noreferrer'>Ver factura</a>
                              </span>
                           </li>
                        )
                     }
                        {noBill && <p>No has generado facturas</p>}
                        {loader && <p>Cargando...</p>}
                  </ul>
               </div>
            </article>
         </section>
         </div>
      </>
   );
};

History.propTypes = {
   loader: PropTypes.bool.isRequired,
   noBill: PropTypes.bool.isRequired,
   history: PropTypes.arrayOf(
      PropTypes.object
   ).isRequired,

}

export default History;