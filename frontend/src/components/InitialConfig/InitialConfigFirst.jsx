/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const InitialConfigFirst = (props) => {

   const {
      handleChangeInputConfig,
      handleClickNext,
      choiseOne,
      formFirst
   } = props;
   return (
      <div className='InitialConfig__first'>
         <h2>
            Configuración inicial:
         </h2>
            <p>
               Para poder generar tus facturas con validez fiscal necesitamos que nos des información de que requermientos debe tener tu factura.
            </p>
         <div>
            <h3> <span>Tus facturas necesitan:</span> </h3>
            <label className='radio font-small'>
               <input
                  type='radio'
                  name='typeCF'
                  value='CF'
                  onChange={handleChangeInputConfig}
                  checked={formFirst.typeCF === 'CF'}
               />
               <span className='radiomark'> </span>
               Comprobante fiscal.
            </label>
            <label className='radio font-small'>
               <input
                  type='radio'
                  name='typeCF'
                  value='fiscalId'
                  onChange={handleChangeInputConfig}
                  checked={formFirst.typeCF === 'fiscalId'}
               />
               <span className='radiomark'> </span>
                  Identificador fiscal o identificador tributario.
            </label>
         </div>
         {choiseOne && <p className='alert-form'>Debes escoger una de las opciones.</p>}
         <div className='InitialConfig__buttons button-first'>
            <button type='button' onClick={handleClickNext}>Aceptar</button>
         </div>
      </div>
   );
}

InitialConfigFirst.propTypes = {
   handleChangeInputConfig: PropTypes.func.isRequired,
   handleClickNext: PropTypes.func.isRequired,
   formFirst: PropTypes.object,
   choiseOne: PropTypes.bool
}

export default InitialConfigFirst;