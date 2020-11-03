/* eslint-disable consistent-return */
import React, { useState } from 'react';
import Bill from './Bill';

const BillContainer = () => {

   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const RegExEmail = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
   const token = window.sessionStorage.getItem('token');
   const user = JSON.parse(window.sessionStorage.getItem('user'));
   const [customerId, setCustomerId] = useState('');
   const [customers, setCustomers] = useState();
   const [emailValidate, setEmailValidate] = useState(false);
   const [fullNameValidate, setFullNameValidate] = useState(false);
   const [fiscalIdValidate, setFiscalIdValidate] = useState(false);
   const [CFDIValidate, setCFDIValidate] = useState(false);
   const [modal, setModal] = useState(false);
   const [count, setCount] = useState(0);
   const [form, setValues] = useState({
      fullName: '',
      fiscalId: '',
      email: '',
      phoneNumber: '',
      comments: '',
   });
   // Manage product item
   const [article, setArticle] = useState({
      description: '',
      id: '',
      price: '',
      product: '',
      quantity: null
   });
   const [formProduct] = useState([]);
   const [itemProduct, setItemProduct] = useState([]);
   const addItem = () => {
      setCount(count + 1);
      itemProduct.push(count);
      // formProduct.push(article);
   }
   const removeItem = (item) => {
      setItemProduct(itemProduct.filter(elem => {
         return elem !== item
      }));
   }

   const validate = () => {
      let email;
      let fullName;
      let fiscalId;
      let CFDI;

      if (RegExEmail.test(form.email)) {
         setEmailValidate(false);
         email = true;
      } else {
         setEmailValidate(true);
      }
      if(form.fullName.length > 1) {
         setFullNameValidate(false);
         fullName = true;
      } else {
         setFullNameValidate(true);
      }
      if(form.fiscalId.length > 5) {
         setFiscalIdValidate(false);
         fiscalId = true;
      } else {
         setFiscalIdValidate(true)
      }
      if (user?.country === 'MEX') {
         if (form.CFDI !== undefined) {
            setCFDIValidate(false)
            CFDI = true;
         } else {
            setCFDIValidate(true)
         }
      } else {
         setCFDIValidate(false)
         CFDI = true;
      }

      if(email && fullName && fiscalId && CFDI) {
         return true
      }
   }
   const handleInput = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value,
      });
   }
   const handleInputProduct = e => {
      setArticle({
         ...article,
         [e.target.name]: e.target.value,
      })
   }
   window.console.log(article, 'article')
   window.console.log(formProduct, 'formProduct');

   const handleSubmit = e => {
      e.preventDefault();
      form.products = formProduct;
      window.console.log(form, 'form');
      const postData = async () => {
         try {
            const request = await fetch(`sa`, {
               method: 'POST',
               body: JSON.stringify(form)
            });
            window.console.log(request)
         } catch(error) {
            window.console.log(error);
         }
      }
      if(validate()) {
         postData();
      }
   }

   const handleModal = () => {
      if(modal) {
         setModal(false);
      } else {
         setModal(true);
         const getData = async () => {
            try {
               const response = await fetch(`${API}user/clients`, {
                  method: 'GET',
                  headers: {
                     'Authorization': `Bearer ${token}`
                  }
               });
               const data = await response.json();
               setCustomers(data);
            } catch(error) {
               window.console.log(error);
            }
         }
         getData();
      }
   }
   const handleInputCustomer = e => {
      setCustomerId(e.target.value);
   }

   const getDataCustomerId = async () => {
      try {
         const response = await fetch(`${API}user/clients/${customerId}`, {
            method: 'GET',
            headers: {
               'Authorization': `Bearer ${token}`
            }
         });
         const data = await response.json();
         form.fullName = data.clients[0]?.fullName
         form.fiscalId = data.clients[0]?.fiscalId
         form.email = data.clients[0]?.email
         form.phoneNumber = data.clients[0]?.phoneNumber
         // getCustomer(data)
      } catch(error) {
         window.console.error(error);
      }
      handleModal()
   }


   return (
      <Bill
         emailValidate={emailValidate}
         fullNameValidate={fullNameValidate}
         fiscalIdValidate={fiscalIdValidate}
         CFDIValidate={CFDIValidate}
         modal={modal}
         itemProduct={itemProduct}
         form={form}
         customers={customers}
         addItem={addItem}
         removeItem={removeItem}
         handleInput={handleInput}
         handleInputProduct={handleInputProduct}
         handleSubmit={handleSubmit}
         handleModal={handleModal}
         handleInputCustomer={handleInputCustomer}
         getDataCustomerId={getDataCustomerId}
      />
   );
}

export default BillContainer;