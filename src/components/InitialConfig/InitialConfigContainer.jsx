import React, { useState } from 'react';

import InitialConfig from './InitialConfig';

const InitialConfigContainer = () => {

   // General
   const [slide, setSlide] = useState(true);
   const [type, setType] = useState('false');
   const user = JSON.parse(window.sessionStorage.getItem('user'));

   // Código para comprobantes fiscales
   const [formCF, setValues] = useState({
      firstName: user.firstName,
      lastName: '',
      birthOfDay: '',
      country: user.country,
      nameCompany: '',
      fiscalId: '',
      nameFiscal: ''
   });
   const [comprobanteFiscal, setComprobanteFiscal] = useState({});
   const [comprobanteFiscalJoin, setComprobanteFiscalJoin] = useState();
   const handleChangeInput = e => {
      setValues({
         ...formCF,
         [e.target.name]: e.target.value
      });
   }
   const handleChangeInputCf = e => {
      setComprobanteFiscal({
         ...comprobanteFiscal,
         [e.target.name]: e.target.value
      })
      const CF = Object.values(comprobanteFiscal).join('')
      setComprobanteFiscalJoin(CF)
   }
   // window.console.log(formCF);
   // window.console.log(comprobanteFiscal);

   // Código para Indetificador fiscal
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
      } else if (formFirst === undefined) {
         setChoiseOne(true)
      }
   }
   const handleClickPrev = () => {
      setSlide(true);
   }
   window.console.log(formFirst);

   return (
      <InitialConfig
         handleChangeInput={handleChangeInput}
         handleChangeInputCf={handleChangeInputCf}
         formCF={formCF}
         comprobanteFiscal={comprobanteFiscal}
         comprobanteFiscalJoin={comprobanteFiscalJoin}

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