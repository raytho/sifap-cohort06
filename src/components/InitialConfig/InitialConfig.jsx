import React from 'react';

import Header from '../Header/Header';

import '../../assets/styles/components/InitialConfig/InitialConfig.scss';

const InitialConfig = (props) => {

   const {
      handleChangeInput,
      handleChangeInputCf,
      form,
      comprobanteFiscal,
   } = props;

   return (
      <>
      <Header />
         <div className='InitialConfig'>
            <div className='InitialConfig__header'>
            </div>
            <div className='InitialConfig__main'>
               <form>
                  <div className='InitialConfig__persona-data'>
                     <h2>Datos generales</h2>
                     <div>
                        <p>
                           <span>Con tu identificador fiscal se emitirán las facturas con validez fiscal.</span>
                        </p>
                        <div className='InitialConfig__persona-input'>
                           <div >
                              <label>Nombres:
                                 <input 
                                    type='text'
                                    value={form.firstName}
                                    name='firstName'
                                    placeholder='Nombre'
                                    onChange={handleChangeInput}
                                 />
                              </label>
                              <label>Apellidos:
                                 <input 
                                    type='text'
                                    value={form.firstName}
                                    name='firstName'
                                    placeholder='Nombre'
                                    onChange={handleChangeInput}
                                 />
                              </label>
                              <label>Fecha de nacimiento:
                                 <input 
                                    type='text'
                                    value={form.firstName}
                                    name='firstName'
                                    placeholder='Nombre'
                                    onChange={handleChangeInput}
                                 />
                              </label>
                              <label>País:
                                 <input 
                                    type='text'
                                    value={form.firstName}
                                    name='firstName'
                                    placeholder='Nombre'
                                    onChange={handleChangeInput}
                                 />
                              </label>
                           </div>


                           <div>
                              <label>Nombre de la empresa:
                                 <input 
                                    type='text'
                                    value={form.firstName}
                                    name='firstName'
                                    placeholder='Nombre'
                                    onChange={handleChangeInput}
                                 />
                              </label>
                              <label>Identificador fiscal:
                                 <input 
                                    type='text'
                                    value={form.firstName}
                                    name='firstName'
                                    placeholder='Nombre'
                                    onChange={handleChangeInput}
                                 />
                              </label>
                              <label>
                                 <p>Nombre del identificador fiscal en tu país:</p>
                                 <input 
                                    type='text'
                                    value={form.firstName}
                                    name='firstName'
                                    placeholder='Nombre'
                                    onChange={handleChangeInput}
                                 />
                              </label>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className='InitialConfig__cf-panel'>
                     <div>
                        <h2>
                           Estructura de comprobantes fiscales:
                        </h2>
                        <p>
                           Configura la estructura de tu comprobante fiscal
                        </p>
                        <div className='InitialConfig__cf-input'>
                           <p>
                              <span>
                                 Comprobantes fiscales:
                              </span>
                           </p>
                           <div>
                              <p></p>
                           </div>
                           <label>
                              Fracción:
                              <input
                                 type='text'
                                 value={comprobanteFiscal.cf}
                                 name='cf'
                                 placeholder='Fracción'
                                 onChange={handleChangeInputCf}
                              />
                              <button type='button' >+</button>
                           </label>
                           <div>
                              {/* Aquí vamos poniendo los que nuevo Fracción */}
                           </div>
                        </div>
                     </div>
                     <div>
                        <h2>
                           Estructura de comprobantes fiscales:
                        </h2>
                        <p>
                           Configura la estructura de tu comprobante fiscal
                        </p>
                        <div className='InitialConfig__cf-input'>
                           <p>
                              <span>
                                 Comprobantes fiscales:
                              </span>
                           </p>
                           <div>
                              <p></p>
                           </div>
                           <label>
                              Fracción:
                              <input
                                 type='text'
                                 value={comprobanteFiscal.cf}
                                 name='cf'
                                 placeholder='Fracción'
                                 onChange={handleChangeInputCf}
                              />
                              <button type='button' >+</button>
                           </label>
                           <div>
                              <label>
                                 Fracción:
                                 <input
                                    type='text'
                                    value={comprobanteFiscal.cf}
                                    name='cf'
                                    placeholder='Fracción'
                                    onChange={handleChangeInputCf}
                                 />
                                 <button type='button' >+</button>
                              </label>
                              <label>
                                 Fracción:
                                 <input
                                    type='text'
                                    value={comprobanteFiscal.cf}
                                    name='cf'
                                    placeholder='Fracción'
                                    onChange={handleChangeInputCf}
                                 />
                                 <button type='button' >+</button>
                              </label>
                              <label>
                                 Fracción:
                                 <input
                                    type='text'
                                    value={comprobanteFiscal.cf}
                                    name='cf'
                                    placeholder='Fracción'
                                    onChange={handleChangeInputCf}
                                 />
                                 <button type='button' >+</button>
                              </label>
                           </div>
                        </div>
                     </div>
                  </div>   
               </form>
            </div>
         </div>
      </>
   );
}

export default InitialConfig;