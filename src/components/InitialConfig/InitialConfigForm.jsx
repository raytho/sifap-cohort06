/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes, { arrayOf, objectOf } from 'prop-types';

import InitialConfigCF from './InitialConfigCF';

const InitialConfigForm = (props) => {

   const {
      handleChangeInput,
      handleChangeInputCf,
      handleChangeInputCfName,
      handleClickPrev,
      handleSubmit,
      formCF,
      countries,
      comprobanteFiscalName,
      comprobanteFiscal,
      type,
      countryValidate,
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
                  <div>
                  <label htmlFor='country'>País: <i>*</i>
                  <select name='country' onChange={handleChangeInput}>
                     <option value=''>País</option>
                     {
                        countries.map(item => <option key={item.idcountries} value={item.code}>{item.name}</option>)
                     }
                  </select>
                     {!countryValidate && <p>Este campo es obligatorio</p>}
                  </label>
               </div>
               <div>
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
                  type={type}
                  comprobanteFiscalName={comprobanteFiscalName}
                  handleChangeInputCfIncrement={handleChangeInputCfIncrement}
                  comprobanteFiscal={comprobanteFiscal}
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
   handleChangeInputCfName: PropTypes.func.isRequired,
   handleChangeInputCfIncrement: PropTypes.func.isRequired,
   handleClickPrev: PropTypes.func.isRequired,
   handleSubmit: PropTypes.func.isRequired,
   formCF: PropTypes.objectOf(arrayOf),
   countries: PropTypes.arrayOf(objectOf),
   type: PropTypes.string,
   comprobanteFiscal: PropTypes.objectOf(arrayOf),
   comprobanteFiscalName: PropTypes.objectOf(arrayOf),
   handleChangeInputCfSeparator: PropTypes.func,
   separator: PropTypes.string,
   countryValidate: PropTypes.bool,
   comprobanteFiscalValidate: PropTypes.bool,
   comprobanteFiscalNameValidate: PropTypes.bool,
   nameIdentifierFiscalValidate: PropTypes.bool,
}

export default InitialConfigForm;