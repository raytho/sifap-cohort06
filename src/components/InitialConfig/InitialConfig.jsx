/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';

import InitialConfigForm from './InitialConfigForm';
import InitialConfigFirst from './InitialConfigFirst';
import Header from '../Header/Header';

import '../../assets/styles/components/InitialConfig/InitialConfig.scss';

const InitialConfig = (props) => {

   const {
      handleChangeInput,
      handleChangeInputCf,
      handleChangeInputCfName,
      handleSubmit,
      formCF,
      comprobanteFiscalName,
      comprobanteFiscal,
      handleChangeInputConfig,
      slide,
      type,
      handleClickNext,
      handleClickPrev,
      choiseOne,
      formFirst,
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

   const user = JSON.parse(window.sessionStorage.getItem('user'));
   return (
      <>
      <Header />
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

            {/* <InitialConfigForm
                  handleChangeInput={handleChangeInput}
                  handleChangeInputCf={handleChangeInputCf}
                  formCF={formCF}
                  comprobanteFiscal={comprobanteFiscal}
                  handleChangeInputCfName={handleChangeInputCfName}
                  comprobanteFiscalJoin={comprobanteFiscalJoin}
                  handleClickNext={handleClickNext}
                  handleClickPrev={handleClickPrev}
                  type={type}
               /> */}

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
                  handleChangeInputCfSeparator={handleChangeInputCfSeparator}
                  separator={separator}
                  comprobanteFiscalName={comprobanteFiscalName}
                  comprobanteFiscal={comprobanteFiscal}
                  handleClickNext={handleClickNext}
                  handleClickPrev={handleClickPrev}
                  type={type}
                  firstNameValidate={firstNameValidate}
                  lastNameValidate={lastNameValidate}
                  dateOfBirthValidate={dateOfBirthValidate}
                  countryValidate={countryValidate}
                  nameCompanyValidate={nameCompanyValidate}
                  fiscalIdValidate={fiscalIdValidate}
                  nameIdentifierFiscalValidate={nameIdentifierFiscalValidate}
                  comprobanteFiscalValidate={comprobanteFiscalValidate}
                  comprobanteFiscalNameValidate={comprobanteFiscalNameValidate}
               />
            }
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
   type: PropTypes.string,
   slide: PropTypes.bool,
   choiseOne: PropTypes.bool,
   firstNameValidate: PropTypes.bool,
   lastNameValidate: PropTypes.bool,
   dateOfBirthValidate: PropTypes.bool,
   countryValidate: PropTypes.bool,
   nameCompanyValidate: PropTypes.bool,
   fiscalIdValidate: PropTypes.bool,
   comprobanteFiscalValidate: PropTypes.bool,
   comprobanteFiscalNameValidate: PropTypes.bool,
   nameIdentifierFiscalValidate: PropTypes.bool,
   handleChangeInputCfSeparator: PropTypes.func,
   separator: PropTypes.string,
}

export default InitialConfig;