/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';

import InitialConfigCF from './InitialConfigCF';

const InitialConfigForm = (props) => {

   const {
      handleChangeInput,
      handleChangeInputCf,
      handleClickPrev,
      formCF,
      comprobanteFiscalJoin,
      type
   } = props;

   const handeSubmit = e => {
      e.preventDefault();
      window.console.log(e)
   }
   return (
      <form onSubmit={handeSubmit}>
         <div className='InitialConfig__persona-data'>
            <h2>Datos generales</h2>
               <p>
                  Con tu identificador fiscal se emitirán las facturas con validez fiscal.
               </p>
            <div>
               <div className='InitialConfig__persona-input'>
                  <div >
                  <label htmlFor='firstName'>Nombres:
                     <input
                        type='text'
                        value={formCF.firstName}
                        name='firstName'
                        placeholder='Nombre'
                        onChange={handleChangeInput}
                     />
                  </label>
                  <label htmlFor='lastName'>Apellidos:
                     <input
                        type='text'
                        value={formCF.lastName}
                        name='lastName'
                        placeholder='Apellido'
                        onChange={handleChangeInput}
                     />
                  </label>
                  <label htmlFor='birthOfDay'>Fecha de nacimiento:
                     <input
                        type='text'
                        value={formCF.birthOfDay}
                        name='birthOfDay'
                        placeholder='Fecha de nacimiento'
                        onChange={handleChangeInput}
                     />
                  </label>
                  <label htmlFor='country'>País:
                     <input
                        type='text'
                        value={formCF.country}
                        name='country'
                        placeholder='País'
                        onChange={handleChangeInput}
                     />
                  </label>
               </div>


                  <div>
                  <label htmlFor='nameCompany'>Nombre de la empresa:
                     <input
                        type='text'
                        value={formCF.nameCompany}
                        name='nameCompany'
                        placeholder='Nombre de la empresa'
                        onChange={handleChangeInput}
                     />
                  </label>
                  <label htmlFor='fiscalId'>Identificador fiscal:
                     <input
                        type='text'
                        value={formCF.fiscalId}
                        name='fiscalId'
                        placeholder='Identificador fiscal'
                        onChange={handleChangeInput}
                     />
                  </label>
                  <label htmlFor='nameFiscal'>
                     <p>Nombre del identificador fiscal en tu país:</p>
                     <input
                        type='text'
                        value={formCF.nameFiscal}
                        name='nameFiscal'
                        placeholder='Nombre de identificador fiscal'
                        onChange={handleChangeInput}
                     />
                  </label>
               </div>
               </div>
            </div>
         </div>
         {
            type === 'CF' &&
               <InitialConfigCF
                  handleChangeInput={handleChangeInput}
                  handleChangeInputCf={handleChangeInputCf}
                  formCF={formCF}
                  comprobanteFiscalJoin={comprobanteFiscalJoin}
                  handleClickPrev={handleClickPrev}
               />
         }
         <div className='InitialConfig__buttons'>
            <button type='button' onClick={handleClickPrev}>Anterior</button>
            <button type='submit'>Aceptar</button>
         </div>
      </form>
   );
}

InitialConfigForm.propTypes = {
   handleChangeInput: PropTypes.func.isRequired,
   handleChangeInputCf: PropTypes.func.isRequired,
   handleClickPrev: PropTypes.func.isRequired,
   formCF: PropTypes.objectOf(arrayOf),
   type: PropTypes.string,
   comprobanteFiscalJoin: PropTypes.string,
}

export default InitialConfigForm;