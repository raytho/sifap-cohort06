import React, { useState } from 'react';
import FormNewPass from './FormNewPass';

const FormNewPassContainer = () => {

   const [form, setValues] = useState({
      password: '',
      passwordVerify: '',
   })

   const handleInputChange = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value,
      })
   }
   const handelSubmit = e => {
      // 
   }

   return (
      <FormNewPass
         handleInputChange={handleInputChange}
         handelSubmit={handelSubmit}
         form={form}
      />
   );
}

export default FormNewPassContainer;