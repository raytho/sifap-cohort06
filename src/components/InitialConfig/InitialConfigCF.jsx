/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes, { arrayOf } from 'prop-types';

const InitialConfigCF = (props) => {

   const {
      handleChangeInputCf,
      handleChangeInputCfName,
      handleChangeInputCfIncrement,
      comprobanteFiscal,
      comprobanteFiscalName,
      handleChangeInputCfSeparator,
      separator,
      comprobanteFiscalValidate,
      comprobanteFiscalNameValidate,
   } = props;

   const [item] = useState([]);
   const [count, setCount] = useState(0);
   const [disable, setDisable] = useState(true);
   // const [separator, setSeparator] = useState();
   const chunksCF = Object.values(comprobanteFiscal);
   const chunksCFName = Object.values(comprobanteFiscalName);
   const chunksCFJoin = chunksCF.join(separator || '');
   window.console.log(chunksCF)
   const handeClickAddItem = () => {
      if(count === 10) {
         setCount(10)
      } else if (count >= 0 && count < 10) {
         setCount(count + 1)
         item.push(count)
      }
   }
   useEffect(() => {
      chunksCFName.forEach(i => {
         window.console.log(i)
         if (i.length <= 0) {
            setDisable(true)
         } else {
            setDisable(false)
         }
      })
   }, [chunksCFName]);
   return (
      <>
         <div className='InitialConfig__cf-panel'>
            <div className='InitialConfig__cf-ejemplo'>
               <h2>
                  Ejemplo de estructura de comprobantes fiscales:
               </h2>
               <p>
                  Por favor lee detenidamente esa sección y así podrás proporcionarnos de la mejor manera tu estructura.
               </p>
               <div>
                  <div className='InitialConfig__cf-explain'>
                     <p>
                        La estructura del número de comprobante fiscal varía dependiendo del país,
                        este es un ejemplo de como podría ser un comprobante fiscal y su estructura.
                     </p>
                     <p>
                        A cada componente que conforma el comprobante fiscal lo llamaremos <span>fracción</span>.
                     </p>
                     <p>
                        <span>Fracciones:</span>
                     </p>
                     <p>Las fracciones se conforman por Nombre y el Valor que representa.</p>
                     <ul>
                        <li><span>Serie: </span>La serie que lleva los comprobantes fiscales</li>
                        <li>
                           <span>Tipo de comprobante: </span>Indica que tipo de transacción se realiza, ejemplo: consumidor final, debito, credito, etc
                        </li>
                        <li><span>Secuencial: </span>Comprobantes emitidos</li>
                     </ul>
                     <img src='https://cdn.discordapp.com/attachments/748935265942372353/769347876999659530/unknown.png' alt='' />
                     <div>
                        <p><span>Arma tu comprobante:</span></p>
                        <p>En el siguiente recuadro vas a ver un ejemplo de cómo decirnos la estructura de tu comprobante fiscal.</p>
                        <span>
                           <span>
                              Nombre
                           </span>
                           <span>
                              Fracción
                           </span>
                           <span>
                              Incrementa
                           </span>
                        </span>
                        <div>
                           <input
                              type='text'
                              name='cf'
                              placeholder='Nombre'
                              disabled
                           />
                           <input
                              type='text'
                              name='cf'
                              placeholder='Fracción'
                              disabled
                           />
                           <label className='check '>
                              <input
                                 type='checkbox'
                                 name='increment'
                                 className='check-input'
                                 disabled
                              />
                              <span className='checkmark'> </span>
                           </label>
                           <button type='button'>+</button>
                        </div>
                        <ul>
                           <li>
                              <span>Nombre:</span> El nombre de la fracción, ejemplo: Serie, tipo de comprobante, etc
                           </li>
                           <li>
                              <span>Fracción (Valor):</span> Los componentes que conforman el comprobante fiscal, ejemplo: 09-
                           </li>
                           <li>
                              <span>Incrementa:</span> Has check si la fracción de tu comprobante tiene que incrementar.
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div className='InitialConfig__cf-section'>
                     <div className='InitialConfig__cf-label'>
                        <p>
                           <span>
                              Comprobantes fiscales:
                           </span>
                        </p>
                        <p>Estructura:</p>
                        <div className='InitialConfig__cf-table'>
                           <span>
                              B-01-00000005
                           </span>
                           <span>
                              <div>
                                 <span>
                                    <p>B</p>
                                 </span>
                                 <h3 >Serie</h3>
                              </div>
                              <div>
                                 <span>
                                    <p>01</p>
                                 </span>
                                 <h3 >Tipo de comprobante</h3>
                              </div>
                              <div>
                                 <span>
                                    <p>00000005</p>
                                 </span>
                                 <h3 >Secuencial</h3>
                              </div>
                           </span>
                        </div>
                        <label htmlFor='cf' className='InitialConfig__cf-input-prev'>
                           <span>
                              <span>
                                 Nombre
                              </span>
                              <span>
                                 Fracción
                              </span>
                              <span>
                                 Incrementa
                              </span>
                           </span>
                           <div>
                              <input
                                 type='text'
                                 name='cf'
                                 placeholder='Nombre'
                                 disabled
                              />
                              <input
                                 type='text'
                                 name='cf'
                                 placeholder='Fracción'
                                 disabled
                              />
                              <label className='check '>
                                 <input
                                    type='checkbox'
                                    name='increment'
                                    className='check-input'
                                    disabled
                                 />
                                 <span className='checkmark'> </span>
                              </label>
                              <button type='button' onClick={handeClickAddItem}>+</button>
                           </div>
                        </label>
                        <div className='InitialConfig__cf-input-separator'>
                           <p>Separador de las fracciones (01-0A/09.): </p>
                           <div>
                              <input
                                 type='text'
                                 name='separator'
                                 value='-'
                                 placeholder='-, /, .'
                                 maxLength='1'
                                 disabled
                              />
                           </div>
                        </div>
                        <div className='InitialConfig__cf-input'>
                           {/* Aquí vamos poniendo los que nuevo Fracción */}
                           <label htmlFor='cf'>
                              <input
                                 type='text'
                                 value='Serie'
                                 disabled
                              />
                              <input
                                 type='text'
                                 value='B'
                                 disabled
                              />
                              <label className='check '>
                                 <input
                                    type='checkbox'
                                    name='increment'
                                    className='check-input'
                                    disabled
                                 />
                                 <span className='checkmark'> </span>
                              </label>
                           </label>
                           <label htmlFor='cf'>
                              <input
                                 type='text'
                                 value='Tipo de comprobante'
                                 disabled
                              />
                              <input
                                 type='text'
                                 value='01'
                                 disabled
                              />
                              <label className='check '>
                                 <input
                                    type='checkbox'
                                    name='increment'
                                    className='check-input'
                                    disabled
                                 />
                                 <span className='checkmark'> </span>
                              </label>
                           </label>
                           <label htmlFor='cf'>
                              <input
                                 type='text'
                                 value='Secuencial'
                                 disabled
                              />
                              <input
                                 type='text'
                                 value='00000005'
                                 disabled
                              />
                              <label className='check '>
                                 <input
                                    type='checkbox'
                                    name='increment'
                                    className='check-input'
                                    disabled
                                 />
                                 <span className='checkmark'> </span>
                              </label>
                           </label>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* Aquí empieza el real */}
            <div className='InitialConfig__cf-section'>
               <h2>
                  Estructura de comprobantes fiscales: <i>*</i>
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
                  <div className='InitialConfig__cf-table'>
                     <span>
                        <p>{chunksCFJoin}</p>
                     </span>
                     <span>
                        {
                           chunksCFName.map((chunkName, i) =>
                           <div key={i}>
                              <span>
                                 <p>{chunksCF[i]}</p>
                              </span>
                              <h3 >{chunkName}</h3>
                           </div>
                        )}
                     </span>
                  </div>
                  <label htmlFor='cf' className='InitialConfig__cf-input-prev'>
                     <span>
                        <span>
                           Nombre
                        </span>
                        <span>
                           Fracción
                        </span>
                        <span>
                           Incrementa
                        </span>
                     </span>
                     <div>
                        <input
                           type='text'
                           name='cf'
                           placeholder='Nombre'
                           disabled
                        />
                        <input
                           type='text'
                           name='cf'
                           placeholder='Fracción'
                           disabled
                        />
                        <label className='check '>
                           <input
                              type='checkbox'
                              name='increment'
                              className='check-input'
                              disabled
                           />
                           <span className='checkmark'> </span>
                        </label>
                        <button type='button' onClick={handeClickAddItem}>+</button>
                     </div>
                  </label>
                  <div className='InitialConfig__cf-input-separator'>
                     <p>Separador de las fracciones: <span>(01-0A/09.10)</span></p>
                     <div>
                        <input
                           type='text'
                           name='separator'
                           placeholder='-, /, .'
                           maxLength='1'
                           onChange={handleChangeInputCfSeparator}
                        />
                     </div>
                  </div>
                  <div className='InitialConfig__cf-input'>
                     {/* Aquí vamos poniendo los que nuevo Fracción */}
                     {
                        item.map(i =>
                           <label key={i} htmlFor='cf'>
                              <input
                                 type='text'
                                 // value={`${comprobanteFiscal.cf}-${i}`}
                                 name={`nameCf${i}`}
                                 placeholder='Nombre'
                                 onChange={handleChangeInputCfName}
                              />
                              <input
                                 type='text'
                                 // value={`${comprobanteFiscal.cf}-${i}`}
                                 name={`cf${i}`}
                                 placeholder='Fracción'
                                 onChange={handleChangeInputCf}
                                 disabled={disable}
                              />
                              <label className='check '>
                                 <input
                                    type='checkbox'
                                    name={`increment${i}`}
                                    className='check-input'
                                    onChange={handleChangeInputCfIncrement}
                                 />
                                 <span className='checkmark'> </span>
                              </label>
                           </label>
                        )
                     }
                  </div>
               </div>
               {!comprobanteFiscalValidate && !comprobanteFiscalNameValidate  &&
                  <p className='alert-form'>Debes proporcionar la estructura de comprobantes fiscales en tu país.</p>
               }
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
   handleChangeInputCfName: PropTypes.func.isRequired,
   handleChangeInputCfIncrement: PropTypes.func.isRequired,
   handleChangeInputCfSeparator: PropTypes.func.isRequired,
   separator: PropTypes.string,
   comprobanteFiscal: PropTypes.objectOf(arrayOf),
   comprobanteFiscalName: PropTypes.objectOf(arrayOf),
   comprobanteFiscalValidate: PropTypes.bool,
   comprobanteFiscalNameValidate: PropTypes.bool,
}

export default InitialConfigCF;