/* eslint-disable consistent-return */
import React, { useState } from 'react';

import InitialConfig from './InitialConfig';

const InitialConfigContainer = () => {

   // General
   const [slide, setSlide] = useState(true);
   const [type, setType] = useState('false');
   const user = JSON.parse(window.sessionStorage.getItem('user'));
   const token = window.sessionStorage.getItem('token');
   // Código para comprobantes fiscales e identificadores fiscales
   const [formCF, setValues] = useState({
      firstName: user.firstName,
      lastName: '',
      dateOfBirth: '',
      country: user.country,
      companyName: '',
      fiscalId: '',
      fiscalIdentifierName: ''
   });
   const [comprobanteFiscal, setComprobanteFiscal] = useState({});
   const [comprobanteFiscalName, setComprobanteFiscalName] = useState({});
   const [comprobanteFiscalIncrement, setComprobanteFiscalIncrement] = useState({});
   const [separator, setSeparator] = useState();
   const [comprobanteFiscalValidate, setComprobanteFiscalValidate] = useState(true);
   const [comprobanteFiscalNameValidate, setComprobanteFiscalNameValidate] = useState(true);
   const [firstNameValidate, setFirstNameValidate] = useState(true);
   const [lastNameValidate, setLastNameValidate] = useState(true);
   const [dateOfBirthValidate, setDateOfBirthValidate] = useState(true);
   const [countryValidate, setCountryValidate] = useState(true);
   const [nameCompanyValidate, setNameCompanyValidate] = useState(true);
   const [fiscalIdValidate, setFiscalIdValidate] = useState(true);
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
      window.console.log(e.target.name.substring(0, 9))
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
   const validateForm = () => {
      let firstName;
      let lastName;
      let dateOfBirth;
      let country;
      let nameCompany;
      let fiscalId;
      let nameIdentifierFiscal;
      let comprobanteF;
      let comprobanteFName;

      if (formCF.firstName.length > 3) {
         setFirstNameValidate(true);
         firstName = true;
      } else {
         setFirstNameValidate(false);
      }
      if (formCF.lastName.length > 3) {
         setLastNameValidate(true);
         lastName = true;
      } else {
         setLastNameValidate(false)
      }
      if (formCF.dateOfBirth.length === 10) {
         setDateOfBirthValidate(true);
         dateOfBirth = true;
      } else {
         setDateOfBirthValidate(false);
      }
      if (formCF.country.length > 2) {
         setCountryValidate(true);
         country = true;
      } else {
         setCountryValidate(false);
      }
      if (formCF.companyName.length > 2) {
         setNameCompanyValidate(true);
         nameCompany = true;
      } else {
         setNameCompanyValidate(false)
      }
      if (formCF.fiscalId.length > 5) {
         setFiscalIdValidate(true);
         fiscalId = true;
      } else {
         setFiscalIdValidate(false)
      }
      if (formCF.fiscalIdentifierName.length > 2) {
         setNameIdentifierFiscalValidate(true);
         nameIdentifierFiscal = true;
      } else {
         setNameIdentifierFiscalValidate(false)
      }
      if (comprobanteFiscal.length > 2) {
         setComprobanteFiscalValidate(true)
         comprobanteF = true;
      } else {
         setComprobanteFiscalValidate(false)
      }
      if (comprobanteFiscalName.length > 2) {
         setComprobanteFiscalNameValidate(true);
         comprobanteFName = true;
      } else {
         setComprobanteFiscalNameValidate(false);
      }
       if (
         firstName
         && lastName
         && dateOfBirth
         && country
         && nameCompany
         && fiscalId
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
      window.console.log(formCF)
      const postData = async () => {
         if (validateForm()) {
            try {
               const response = await fetch(`${API}${type === 'CF' ? 'user/tax-receipt' : 'user/tax-identifier'}`, {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify(formCF)
               });
               window.console.log(response);
               const { message } = await response.json();
               window.console.log(message)
            } catch(error) {
               window.console.log(error);
            }
         }
      }
      postData();
   }

   return (
      <InitialConfig
         handleChangeInput={handleChangeInput}
         handleChangeInputCf={handleChangeInputCf}
         formCF={formCF}
         comprobanteFiscal={comprobanteFiscal}
         comprobanteFiscalName={comprobanteFiscalName}
         handleChangeInputCfName={handleChangeInputCfName}
         handleChangeInputCfIncrement={handleChangeInputCfIncrement}
         firstNameValidate={firstNameValidate}
         lastNameValidate={lastNameValidate}
         dateOfBirthValidate={dateOfBirthValidate}
         countryValidate={countryValidate}
         nameCompanyValidate={nameCompanyValidate}
         comprobanteFiscalValidate={comprobanteFiscalValidate}
         comprobanteFiscalNameValidate={comprobanteFiscalNameValidate}
         fiscalIdValidate={fiscalIdValidate}
         nameIdentifierFiscalValidate={nameIdentifierFiscalValidate}
         handleChangeInputCfSeparator={handleChangeInputCfSeparator}
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