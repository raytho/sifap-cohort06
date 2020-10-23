/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InitialConfigCF = (props) => {

   const {
      handleChangeInputCf,
      comprobanteFiscalJoin,
   } = props;

   const [item] = useState([]);
   const [count, setCount] = useState(0);
   const handeClickAddItem = () => {
      setCount(count + 1)
      item.push(count)
   }

   return (
      <>
         <div className='InitialConfig__cf-panel'>
            <div className='InitialConfig__cf-section'>
               <h2>
                  Estructura de comprobantes fiscales:
               </h2>
               <p>
                  Configura la estructura de tu comprobante fiscal.
               </p>
               <div className='InitialConfig__cf-label'>
                  <p>
                     <span>
                        Comprobantes fiscales:
                     </span>
                  </p>
                  <p>Estructura:</p>
                  <div>
                     <p>
                        {comprobanteFiscalJoin}
                     </p>
                  </div>
                  <label htmlFor='cf'>
                     Fracción:
                     <div>
                        <input
                           type='text'
                           name='cf'
                           placeholder='Fracción'
                           disabled
                        />
                        <button type='button' onClick={handeClickAddItem}>+</button>
                     </div>
                  </label>
                  <div className='InitialConfig__cf-input'>
                     {/* Aquí vamos poniendo los que nuevo Fracción */}
                     {
                        item.map(i =>
                           <label key={i} htmlFor='cf'>
                              <input
                                 type='text'
                                 // value={`${comprobanteFiscal.cf}-${i}`}
                                 name={`cf-${i}`}
                                 placeholder='Fracción'
                                 onChange={handleChangeInputCf}
                              />
                           </label>
                        )
                     }
                  </div>
               </div>
            </div>


            <div className='InitialConfig__cf-section'>
               <h2>
                  Ejemplo:
               </h2>
               <p>
                  Configura la estructura de tu comprobante fiscal.
               </p>
               <div className='InitialConfig__cf-label'>
                  <p>
                     <span>
                        Comprobantes fiscales:
                     </span>
                  </p>
                  <p>Estructura:</p>
                  <div>
                     <p>
                        12-0000009-1
                     </p>
                  </div>
                  <label htmlFor='cf'>
                     Fracción:
                     <div>
                        <input
                           defaultValue=''
                           type='text'
                           placeholder='Fracción'
                           disabled
                        />
                        <button type='button' >+</button>
                     </div>
                  </label>
                  <div className='InitialConfig__cf-input'>
                     {/* Aquí vamos poniendo los que nuevo Fracción */}
                     <label htmlFor='cf'>
                        <input
                           type='text'
                           defaultValue='12-'
                           name='cf'
                           disabled
                        />
                     </label>
                     <label htmlFor='cf'>
                        <input
                           type='text'
                           defaultValue='0000009'
                           name='cf'
                           disabled
                        />
                     </label>
                     <label htmlFor='cf'>
                        <input
                           type='text'
                           defaultValue='-1'
                           name='cf'
                           disabled
                        />
                     </label>
                  </div>
               </div>
            </div>
         </div>
         {/* <div className='InitialConfig__buttons'>
            <button type='button' onClick={handleClickPrev}>Anterior</button>
            <button type='submit'>Aceptar</button>
         </div> */}
      </>
   );
}

InitialConfigCF.propTypes = {
   handleChangeInputCf: PropTypes.func.isRequired,
   comprobanteFiscalJoin: PropTypes.string,
}

export default InitialConfigCF;