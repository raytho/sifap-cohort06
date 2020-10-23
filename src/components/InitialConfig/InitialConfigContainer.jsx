import React, { useState } from 'react';

import InitialConfig from './InitialConfig';

const InitialConfigContainer = () => {
   
   const [form, setValues] = useState({
      firstName: '',
   });
   const [comprobanteFiscal, setComprobanteFiscal] = useState({
      cf: '',
   }); 
   const handleChangeInput = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value
      });
   }
   const handleChangeInputCf = e => {
      window.console.log(e.target.name);
      setComprobanteFiscal({
         ...form,
         [e.target.name]: e.target.value
      })
   }
   window.console.log(comprobanteFiscal);
   return (
      <InitialConfig
         handleChangeInput={handleChangeInput}
         handleChangeInputCf={handleChangeInputCf}
         form={form}
         comprobanteFiscal={comprobanteFiscal}
      />
   );
}

export default InitialConfigContainer;