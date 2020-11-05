/* eslint-disable no-plusplus */
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
   const [methodPayValidate, setMethodPayValidate] = useState(false);
   const [modal, setModal] = useState(false);
   const [sendBillModal, setSendBillModal] = useState(false);
   const [billPDF, setBillPDF] = useState('')
   const [count, setCount] = useState(0);
   const [formProduct, setFormProduct] = useState([]);
   const [itemProduct] = useState([]);
   const [loaderCustomer, setLoaderCustomer] = useState(true);
   const [form, setValues] = useState(
      user?.country === 'MEX'
      ?  {
            comments: '',
            ivaPorcent: 0,
            paymentMethod: '01',
            cfdiUse: ''
         }
      : {
         comments: '',
         ivaPorcent: 0,
         paymentMethod: '01',
      }
   );
   const [client, setClient] = useState({
      fullName: '',
      fiscalId: '',
      email: '',
      phoneNumber: '',
   });
   // Manage product item
   const [article, setArticle] = useState({
      description: '',
      id: '',
      price: 0,
      product: '',
      quantity: 0,
      unit: '',
      total: 0
   });
   const handleInput = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value,
      });
   }
   const handleInputClient = e => {
      setClient({
         ...client,
         [e.target.name]: e.target.value,
      });
   }
   const handleInputProduct = e => {
      setArticle({
         ...article,
         [e.target.name]: e.target.value,
      })
   }
   const addItem = () => {
      setCount(count + 1);
      itemProduct.push(count);
      formProduct.unshift(article);
      setArticle({
         description: '',
         id: '',
         price: 0,
         product: '',
         quantity: 0,
         unit: ''
      })
   }
   const removeItem = (item) => {
      setFormProduct(formProduct.filter((elem, i) => {
         return i !== item
      }));
   }
      window.console.log(form.paymentMethod.length)
   const validate = () => {
      let email;
      let fullName;
      let fiscalId;
      let CFDI;
      let paymentMethod;

      if (RegExEmail.test(client.email)) {
         setEmailValidate(false);
         email = true;
      } else {
         setEmailValidate(true);
      }
      if(client.fullName.length > 1) {
         setFullNameValidate(false);
         fullName = true;
      } else {
         setFullNameValidate(true);
      }
      if(client.fiscalId.length > 5) {
         setFiscalIdValidate(false);
         fiscalId = true;
      } else {
         setFiscalIdValidate(true)
      }
      if(form.paymentMethod.length > 0 ) {
         setMethodPayValidate(false);
         paymentMethod = true;
      } else {
         setMethodPayValidate(true)
      }
      if (user?.country === 'MEX') {
         if (form.cfdiUse.length > 0) {
            setCFDIValidate(false)
            CFDI = true;
         } else {
            setCFDIValidate(true)
         }
      } else {
         setCFDIValidate(false)
         CFDI = true;
      }

      if(email && fullName && fiscalId && CFDI && paymentMethod) {
         return true
      }
   }

   const handleModalBill = () => {
      if (sendBillModal) {
         setSendBillModal(false);
         setTimeout(() => {
            window.location.reload();
         }, 100);
      }
   }
   const handleSubmit = e => {
      e.preventDefault();
      const postData = async () => {
         form.products = formProduct;
         form.client = client;
         window.console.log(form, 'form');
         try {
            const response = await fetch(`${API}user/invoices`, {
               method: 'POST',
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
               },
               body: JSON.stringify(form)
            });
            const { message, invoiceUrl } = await response.json();
            window.console.log(response);
            window.console.log(message);
            if (message === 'Factura generada correctamente') {
               window.console.log(invoiceUrl);
               setSendBillModal(true);
               setBillPDF(invoiceUrl)
            }
            if (message === 'Ocurrió un error') {
               window.console.log('Hubo un error al generar la factura, vuelve a intentarlo');
            }
         } catch(error) {
            window.console.log(error.message);
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
         const getDataCustomer = async () => {
            try {
               const response = await fetch(`${API}user/clients`, {
                  method: 'GET',
                  headers: {
                     'Authorization': `Bearer ${token}`
                  }
               });
               const data = await response.json();
               setLoaderCustomer(false)
               setCustomers(data);
            } catch(error) {
               window.console.log(error);
            }
         }
         getDataCustomer();
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
         client.fullName = data.clients[0]?.fullName
         client.fiscalId = data.clients[0]?.fiscalId
         client.email = data.clients[0]?.email
         client.phoneNumber = data.clients[0]?.phoneNumber
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
         methodPayValidate={methodPayValidate}
         modal={modal}
         sendBillModal={sendBillModal}
         billPDF={billPDF}
         itemProduct={itemProduct}
         form={form}
         customers={customers}
         formProduct={formProduct}
         client={client}
         article={article}
         loaderCustomer={loaderCustomer}
         addItem={addItem}
         removeItem={removeItem}
         handleInput={handleInput}
         handleInputClient={handleInputClient}
         handleInputProduct={handleInputProduct}
         handleSubmit={handleSubmit}
         handleModal={handleModal}
         handleModalBill={handleModalBill}
         handleInputCustomer={handleInputCustomer}
         getDataCustomerId={getDataCustomerId}
      />
   );
}


export default BillContainer;