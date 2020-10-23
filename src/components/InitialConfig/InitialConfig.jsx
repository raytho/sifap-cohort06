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
      formCF,
      comprobanteFiscalJoin,
      handleChangeInputConfig,
      slide,
      type,
      handleClickNext,
      handleClickPrev,
      choiseOne,
      formFirst
   } = props;

   const user = JSON.parse(window.sessionStorage.getItem('user'));
   window.console.log(user)
   return (
      <>
      <Header />
         <div className='InitialConfig'>
            <div className='InitialConfig__header'>
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
                  formCF={formCF}
                  comprobanteFiscalJoin={comprobanteFiscalJoin}
                  handleClickNext={handleClickNext}
                  handleClickPrev={handleClickPrev}
                  type={type}
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
   handleChangeInputConfig: PropTypes.func.isRequired,
   handleClickNext: PropTypes.func.isRequired,
   handleClickPrev: PropTypes.func.isRequired,
   formCF: PropTypes.objectOf(arrayOf),
   formFirst: PropTypes.objectOf(arrayOf),
   comprobanteFiscalJoin: PropTypes.string,
   type: PropTypes.string,
   slide: PropTypes.bool,
   choiseOne: PropTypes.bool
}

export default InitialConfig;