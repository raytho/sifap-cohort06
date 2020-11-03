/* eslint-disable consistent-return */
import React, { useState, useEffect, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import { Context } from '../../Context';

import InitialConfig from './InitialConfig';

const InitialConfigContainer = () => {

   // General
   const [slide, setSlide] = useState(true);
   const [type, setType] = useState('false');
   const token = window.sessionStorage.getItem('token');
   const { setInitialConfig } = useContext(Context);
   // Código para comprobantes fiscales e identificadores fiscales
   const [formCF, setValues] = useState({
      country: '',
      fiscalIdentifierName: ''
   });
   const controller = new AbortController();
   const [countries, setCountries] = useState();
   const [modal, setModal] = useState(false);
   const [comprobanteFiscal, setComprobanteFiscal] = useState({});
   const [comprobanteFiscalName, setComprobanteFiscalName] = useState({});
   const [comprobanteFiscalIncrement, setComprobanteFiscalIncrement] = useState({});
   const [separator, setSeparator] = useState();
   const [comprobanteFiscalValidate, setComprobanteFiscalValidate] = useState(true);
   const [comprobanteFiscalNameValidate, setComprobanteFiscalNameValidate] = useState(true);
   const [countryValidate, setCountryValidate] = useState(true);
   const [nameIdentifierFiscalValidate, setNameIdentifierFiscalValidate] = useState(true);

   const handleChangeInput = e => {
      setValues({
         ...formCF,
         [e.target.name]: e.target.value
      });
   }
   const handleChangeInputCfName = e => {
      setComprobanteFiscalName({
         ...comprobanteFiscalName,
         [e.target.name]: e.target.value
      });
   }
   const handleChangeInputCf = e => {
      setComprobanteFiscal({
         ...comprobanteFiscal,
         [e.target.name]: e.target.value
      })
      // Esto sería lo que se envia
   }
   const handleChangeInputCfIncrement = e => {
      setComprobanteFiscalIncrement({
         ...comprobanteFiscalIncrement,
         [e.target.name]: e.target.checked
      })
   }
   const handleChangeInputCfSeparator = (e) => {
      setSeparator(
         e.target.value
      )
   }
   // Código para elegir tipo de validez fiscal
   const [formFirst, setFormFirst] = useState({
      typeCF: '',
   });
   const [choiseOne, setChoiseOne] = useState(false);
   const handleChangeInputConfig = e => {
      setFormFirst({
         [e.target.name]: e.target.value
      });
   }
   const handleClickNext = () => {
      if(formFirst.typeCF === 'CF') {
         // Llamamos al componente completo
         setSlide(false);
         setType('CF');
         setChoiseOne(false)
      } else if(formFirst.typeCF === 'fiscalId') {
         // Llamaos al componente solo con la parte de datos generales
         setSlide(false);
         setType('fiscalId');
         setChoiseOne(false)
      } else if (formFirst) {
         setChoiseOne(true)
      }
   }
   const handleClickPrev = () => {
      setSlide(true);
   }
   const handleModal = () => {
      if (modal) {
         setModal(false);
      } else {
         setModal(true);
      }
   }
   const validateForm = () => {
      let country;
      let nameIdentifierFiscal;
      let comprobanteF;
      let comprobanteFName;

      if (formCF.country.length > 0) {
         setCountryValidate(true);
         country = true;
      } else {
         setCountryValidate(false);
      }
      if (formCF.fiscalIdentifierName.length > 2) {
         setNameIdentifierFiscalValidate(true);
         nameIdentifierFiscal = true;
      } else {
         setNameIdentifierFiscalValidate(false)
      }
      if(type === 'CF') {
         if (Object.values(comprobanteFiscal).length > 0) {
            setComprobanteFiscalValidate(true);
            comprobanteF = true;
         } else {
            setComprobanteFiscalValidate(false);
         }
         if (Object.values(comprobanteFiscalName).length > 0) {
            setComprobanteFiscalNameValidate(true);
            comprobanteFName = true;
         } else {
            setComprobanteFiscalNameValidate(false);
         }
      } else {
         setComprobanteFiscalValidate(true);
         setComprobanteFiscalNameValidate(true);
         comprobanteF = true;
         comprobanteFName = true;
      }
       if (
            country
         && nameIdentifierFiscal
         && comprobanteF
         && comprobanteFName
       ) {
          return true
       }
   }
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const handleSubmit = e => {
      validateForm()
      e.preventDefault();
      formCF.separator = separator;
      formCF.cfName = comprobanteFiscalName;
      formCF.cf = comprobanteFiscal;
      formCF.increment = comprobanteFiscalIncrement;
      const postData = async () => {
            try {
               window.console.log(JSON.stringify(formCF));
               const response = await fetch(`${API}${type === 'CF' ? 'user/tax-receipt' : 'user/tax-identifier'}`, {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify(formCF)
               });
               const { message } = await response.json();
               if (message.status === 'Usuario configurado') {
                  setInitialConfig(true);
                  handleModal()
               } else {
                  window.console.log(message.status);
                  window.console.error('Algo salió mal');
               }
            } catch(error) {
               window.console.log(error);
            }
      }
      if (validateForm()) {
         postData();
      }
   }

   useEffect(() => {
      const getDataCountry = async () => {
         try {
            const response = await fetch(`${API}countries`, {
               signal: controller.signal
            })
            const data = await response.json();
            setCountries(data.data);
         } catch(error) {
            window.console.log(error);
         }
      }
      getDataCountry();

      return () => controller.abort()
   }, []);

   return (
      <InitialConfig
         handleChangeInput={handleChangeInput}
         handleChangeInputCf={handleChangeInputCf}
         formCF={formCF}
         countries={countries}
         comprobanteFiscal={comprobanteFiscal}
         comprobanteFiscalName={comprobanteFiscalName}
         handleChangeInputCfName={handleChangeInputCfName}
         handleChangeInputCfIncrement={handleChangeInputCfIncrement}
         countryValidate={countryValidate}
         comprobanteFiscalValidate={comprobanteFiscalValidate}
         comprobanteFiscalNameValidate={comprobanteFiscalNameValidate}
         nameIdentifierFiscalValidate={nameIdentifierFiscalValidate}
         handleChangeInputCfSeparator={handleChangeInputCfSeparator}
         handleModal={handleModal}
         modal={modal}
         separator={separator}
         handleSubmit={handleSubmit}
         handleChangeInputConfig={handleChangeInputConfig}
         handleClickNext={handleClickNext}
         handleClickPrev={handleClickPrev}
         choiseOne={choiseOne}
         formFirst={formFirst}
         slide={slide}
         type={type}
      />
   );
}

export default InitialConfigContainer;