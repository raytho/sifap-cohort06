/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';

import InitialConfigCF from './InitialConfigCF';

const InitialConfigForm = (props) => {

   const {
      handleChangeInput,
      handleChangeInputCf,
      handleChangeInputCfName,
      handleClickPrev,
      handleSubmit,
      formCF,
      comprobanteFiscalName,
      comprobanteFiscal,
      type,
      firstNameValidate,
      lastNameValidate,
      dateOfBirthValidate,
      countryValidate,
      nameCompanyValidate,
      fiscalIdValidate,
      comprobanteFiscalValidate,
      comprobanteFiscalNameValidate,
      nameIdentifierFiscalValidate,
      handleChangeInputCfSeparator,
      handleChangeInputCfIncrement,
      separator
   } = props;
   return (
      <form onSubmit={handleSubmit}>
         <div className='InitialConfig__persona-data'>
            <h2>Datos generales</h2>
               <p>
                  Con tu {type === 'fiscalId'
                  ? 'identificador'
                  : 'comprobante'} fiscal se emitirán las facturas con validez fiscal.

               </p>
            <div>
               <div className='InitialConfig__persona-input'>
                  <div >
                  <label htmlFor='firstName'>Nombres: <i>*</i>
                     <input
                        type='text'
                        value={formCF.firstName}
                        name='firstName'
                        placeholder='Nombre'
                        onChange={handleChangeInput}
                     />
                     {!firstNameValidate && <p>Este campo es obligatorio</p>}
                  </label>
                  <label htmlFor='lastName'>Apellidos: <i>*</i>
                     <input
                        type='text'
                        value={formCF.lastName}
                        name='lastName'
                        placeholder='Apellido'
                        onChange={handleChangeInput}
                     />
                     {!lastNameValidate && <p>Este campo es obligatorio</p>}
                  </label>
                  <label htmlFor='birthOfDay'>Fecha de nacimiento: <i>*</i>
                     <input
                        type='date'
                        value={formCF.dateOfBirth}
                        name='dateOfBirth'
                        placeholder='Fecha de nacimiento'
                        onChange={handleChangeInput}
                     />
                     {!dateOfBirthValidate && <p>Este campo es obligatorio</p>}
                  </label>
                  <label htmlFor='country'>País: <i>*</i>
                     <input
                        type='text'
                        value={formCF.country}
                        name='country'
                        placeholder='País'
                        onChange={handleChangeInput}
                     />
                     {!countryValidate && <p>Este campo es obligatorio</p>}
                  </label>
               </div>


                  <div>
                  <label htmlFor='nameCompany'>Nombre de la empresa: <i>*</i>
                     <input
                        type='text'
                        value={formCF.companyName}
                        name='companyName'
                        placeholder='Nombre de la empresa'
                        onChange={handleChangeInput}
                     />
                     {!nameCompanyValidate && <p>Este campo es obligatorioe</p>}
                  </label>
                  <label htmlFor='fiscalId'>Identificador fiscal: <i>*</i>
                     <input
                        type='text'
                        value={formCF.fiscalId}
                        name='fiscalId'
                        placeholder='Identificador fiscal'
                        onChange={handleChangeInput}
                     />
                     {!fiscalIdValidate && <p>Este campo es obligatorio</p>}
                  </label>
                  <label htmlFor='nameFiscal'>Nombre del identificador fiscal en tu país: <i>*</i>
                     <input
                        type='text'
                        value={formCF.fiscalIdentifierName}
                        name='fiscalIdentifierName'
                        placeholder='Nombre de identificador fiscal'
                        onChange={handleChangeInput}
                     />
                     {!nameIdentifierFiscalValidate && <p>Este campo es obligatorio</p>}
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
                  handleChangeInputCfName={handleChangeInputCfName}
                  comprobanteFiscalValidate={comprobanteFiscalValidate}
                  comprobanteFiscalNameValidate={comprobanteFiscalNameValidate}
                  formCF={formCF}
                  handleChangeInputCfSeparator={handleChangeInputCfSeparator}
                  separator={separator}
                  comprobanteFiscalName={comprobanteFiscalName}
                  handleChangeInputCfIncrement={handleChangeInputCfIncrement}
                  comprobanteFiscal={comprobanteFiscal}
                  handleClickPrev={handleClickPrev}
               />
         }
      {/* <InitialConfigCF
               handleChangeInput={handleChangeInput}
               handleChangeInputCf={handleChangeInputCf}
               handleChangeInputCfName={handleChangeInputCfName}
               formCF={formCF}
               comprobanteFiscalJoin={comprobanteFiscalJoin}
               handleClickPrev={handleClickPrev}
            /> */}
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
   handleChangeInputCfName: PropTypes.func.isRequired,
   handleChangeInputCfIncrement: PropTypes.func.isRequired,
   handleClickPrev: PropTypes.func.isRequired,
   handleSubmit: PropTypes.func.isRequired,
   formCF: PropTypes.objectOf(arrayOf),
   type: PropTypes.string,
   comprobanteFiscal: PropTypes.objectOf(arrayOf),
   comprobanteFiscalName: PropTypes.objectOf(arrayOf),
   handleChangeInputCfSeparator: PropTypes.func,
   separator: PropTypes.string,
   firstNameValidate: PropTypes.bool,
   lastNameValidate: PropTypes.bool,
   dateOfBirthValidate: PropTypes.bool,
   countryValidate: PropTypes.bool,
   nameCompanyValidate: PropTypes.bool,
   fiscalIdValidate: PropTypes.bool,
   comprobanteFiscalValidate: PropTypes.bool,
   comprobanteFiscalNameValidate: PropTypes.bool,
   nameIdentifierFiscalValidate: PropTypes.bool,
}

export default InitialConfigForm;