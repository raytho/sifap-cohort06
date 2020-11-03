/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes, { arrayOf, objectOf } from 'prop-types';

import InitialConfigForm from './InitialConfigForm';
import InitialConfigFirst from './InitialConfigFirst';
import Title from '../Title';
import InitialConfigModalConfirm from './InitialConfigModalConfirm';

import iconConfig from '../../assets/static/icon/config.png';

import '../../assets/styles/components/InitialConfig/InitialConfig.scss';

const propsConfig = {
   title: 'Configuración de país',
   icon: iconConfig,
   alt: 'Icono configuración'
}

const InitialConfig = (props) => {

   const {
      handleChangeInput,
      handleChangeInputCf,
      handleChangeInputCfName,
      handleSubmit,
      formCF,
      countries,
      comprobanteFiscalName,
      comprobanteFiscal,
      handleChangeInputConfig,
      slide,
      type,
      handleClickNext,
      handleClickPrev,
      choiseOne,
      formFirst,
      countryValidate,
      comprobanteFiscalValidate,
      comprobanteFiscalNameValidate,
      nameIdentifierFiscalValidate,
      handleChangeInputCfSeparator,
      handleChangeInputCfIncrement,
      handleModal,
      modal,
      separator
   } = props;
   
   const user = JSON.parse(window.sessionStorage.getItem('user'));
   return (
      <>
         <Title  {...propsConfig}/>
         <div className='History'>
            <div className='InitialConfig'>
               <div className='InitialConfig__header'>
                     {!slide && <button type='button' onClick={handleClickPrev}> </button>}
                  <span>
                     <p>
                        {user.firstName}
                     </p>
                     <p>
                        {user.userId}
                     </p>
                     <p>
                        {user.email}
                     </p>
                     <p>
                        {user.country}
                     </p>
                  </span>
               </div>
               <div className='InitialConfig__main'>

                  <InitialConfigModalConfirm
                     modal={modal}
                     handleModal={handleModal}
                  />


               {slide
                  ? <InitialConfigFirst
                     handleChangeInputConfig={handleChangeInputConfig}
                     handleClickNext={handleClickNext}
                     choiseOne={choiseOne}
                     formFirst={formFirst}
                  />
                  : <InitialConfigForm
                     handleChangeInput={handleChangeInput}
                     handleChangeInputCf={handleChangeInputCf}
                     handleChangeInputCfName={handleChangeInputCfName}
                     handleChangeInputCfIncrement={handleChangeInputCfIncrement}
                     handleSubmit={handleSubmit}
                     formCF={formCF}
                     countries={countries}
                     handleChangeInputCfSeparator={handleChangeInputCfSeparator}
                     separator={separator}
                     comprobanteFiscalName={comprobanteFiscalName}
                     comprobanteFiscal={comprobanteFiscal}
                     handleClickNext={handleClickNext}
                     handleClickPrev={handleClickPrev}
                     type={type}
                     countryValidate={countryValidate}
                     nameIdentifierFiscalValidate={nameIdentifierFiscalValidate}
                     comprobanteFiscalValidate={comprobanteFiscalValidate}
                     comprobanteFiscalNameValidate={comprobanteFiscalNameValidate}
                  />
               }
               </div>
            </div>
         </div>
      </>
   );
}

InitialConfig.propTypes = {
   handleChangeInput: PropTypes.func.isRequired,
   handleChangeInputCf: PropTypes.func.isRequired,
   handleChangeInputCfName: PropTypes.func.isRequired,
   handleChangeInputConfig: PropTypes.func.isRequired,
   handleChangeInputCfIncrement: PropTypes.func.isRequired,
   handleSubmit: PropTypes.func.isRequired,
   handleClickNext: PropTypes.func.isRequired,
   handleClickPrev: PropTypes.func.isRequired,
   formCF: PropTypes.objectOf(arrayOf),
   formFirst: PropTypes.objectOf(arrayOf),
   comprobanteFiscal: PropTypes.objectOf(arrayOf),
   comprobanteFiscalName: PropTypes.objectOf(arrayOf),
   countries: PropTypes.arrayOf(objectOf),
   type: PropTypes.string,
   slide: PropTypes.bool,
   choiseOne: PropTypes.bool,
   countryValidate: PropTypes.bool,
   comprobanteFiscalValidate: PropTypes.bool,
   comprobanteFiscalNameValidate: PropTypes.bool,
   nameIdentifierFiscalValidate: PropTypes.bool,
   modal: PropTypes.bool,
   handleModal: PropTypes.func,
   handleChangeInputCfSeparator: PropTypes.func,
   separator: PropTypes.string,
}

export default InitialConfig;