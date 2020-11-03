/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes, { object } from 'prop-types';

import Title from '../Title';
import BillItem from './BillItem';
import BillItemAdded from './BillItemAdded';
import BillCustomerModal from './BillCustomerModal';
import iconBill from '../../assets/static/icon/bill.png';
import iconSearch from '../../assets/static/icon/search.png';
import '../../assets/styles/components/Bill/Bill.scss';

const propsBill = {
   title: 'Emitir Facturas',
   icon: iconBill,
   alt: 'Icono Factura'
}

const Bill = (props) => {
   const {
      emailValidate,
      fullNameValidate,
      fiscalIdValidate,
      CFDIValidate,
      modal,
      form,
      customers,
      formProduct,
      article,
      loaderCustomer,
      addItem,
      removeItem,
      handleInput,
      handleInputProduct,
      handleSubmit,
      handleModal,
      handleInputCustomer,
      getDataCustomerId
   } = props;

   const user = JSON.parse(window.sessionStorage.getItem('user'));
   const date = new Date();
   const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
   const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
   const year = date.getFullYear();
   const dateBill = `${month}-${day}-${year}`;

   let sumProduct = 0;
   for (let i = 0; i < formProduct.length; i++) {
      sumProduct += formProduct[i].total
   }
   const ivaResult = sumProduct * form.ivaPorcent / 100;
   form.subtotal = sumProduct;
   form.total = sumProduct + ivaResult;
   window.console.log(form);

   return (
      <>
         <Title {...propsBill} />
         <section className='Bill__panel'>
            <div className='Bill__header'>
               <h2>Factura</h2>
            </div>
            <article className='Bill__main'>
               <form onSubmit={handleSubmit}>
                  <div className='Bill__tax-data'>
                     <div className='Bill__own-data'>
                        <div>
                           <p>
                              <span>Nombre:</span> {user.companyName}
                           </p>
                           <p>
                              <span>{user.fiscalIdentifierName
                                 ? user.fiscalIdentifierName
                                 : 'Identificador fiscal:'}</span> {user.fiscalId}
                           </p>
                           <p>
                              <span>Teléfono:</span> {user.phoneNumber}
                           </p>
                        </div>
                        <div>
                           <p>
                              <span>No.</span> 101
                           </p>
                           <p>
                              <span>Fecha:</span> {dateBill}
                           </p>
                           <p>
                              <span>Correo electrónico:</span> {user.email}
                           </p>
                        </div>
                     </div>
                     <div className='Bill__customer-data'>
                        <div>
                           <button
                              className='Bill__buttons-customers'
                              type='button'
                              onClick={handleModal}
                           >
                              Clientes
                              <img src={iconSearch} alt='Icono de búsqueda' />
                           </button>
                           <BillCustomerModal
                              modal={modal}
                              handleModal={handleModal}
                              customers={customers}
                              loaderCustomer={loaderCustomer}
                              handleInputCustomer={handleInputCustomer}
                              getDataCustomerId={getDataCustomerId}
                           />
                           <label htmlFor='fullName'>
                              Nombre:
                              <input
                                 type='text'
                                 value={form.fullName}
                                 name='fullName'
                                 placeholder='Nombre'
                                 onChange={handleInput}
                              />
                              {fullNameValidate && <p className='alert-form'>Debes ingresar un nombre</p>}
                           </label>
                           <label htmlFor='fiscalId'>
                              {user.fiscalIdentifierName
                                 ? user.fiscalIdentifierName
                                 : 'Identificador fiscal:'}
                              <input
                                 type='text'
                                 value={form.fiscalId}
                                 name='fiscalId'
                                 placeholder='00-010293-12'
                                 onChange={handleInput}
                              />
                              {fiscalIdValidate && <p className='alert-form'>Debes ingresar el indentificador fiscal</p>}
                           </label>
                        </div>
                        <div>
                           <label htmlFor='email'>
                              Correo electrónico:
                              <input
                                 type='text'
                                 value={form.email}
                                 name='email'
                                 placeholder='ejemplo@correo.com'
                                 onChange={handleInput}
                              />
                                 {emailValidate && <p className='alert-form'>Debes ingresar un correo electrónico</p>}
                           </label>
                           <label htmlFor='phoneNumber'>
                              Teléfono:
                              <input
                                 type='text'
                                 value={form.phoneNumber}
                                 name='phoneNumber'
                                 placeholder='Teléfono'
                                 onChange={handleInput}
                              />
                           </label>
                           {user?.country === 'MEX' &&
                              <label htmlFor='CFDI'>
                                 CFDI:
                                 <select name='CFDI' onChange={handleInput}>
                                    <option value=''>CFDI</option>
                                    <option value='G01'>G01 Gastos generales</option>
                                    <option value='G03'>G03 Gastos generales</option>
                                 </select>
                                 {CFDIValidate && <p className='alert-form'>Debes elegir un CFDI</p>}
                              </label>
                           }
                        </div>
                     </div>
                  </div>
                  <div className='Bill__product'>
                     <div className='Bill-product-header'>
                        <p>Item</p>
                        <p>ID</p>
                        <p>Precio unitario</p>
                        <p>Descripción</p>
                        <p>Cantidad</p>
                        <p>Total</p>
                     </div>
                     <div>
                        <BillItem
                              removeItem={removeItem}
                              handleInputProduct={handleInputProduct}
                              addItem={addItem}
                              article={article}
                           />
                     </div>
                     <div className='Bill__container-items'>
                        <ul>
                           {
                              formProduct.map((item, i) =>
                                 <li key={i}>
                                    <BillItemAdded
                                       removeItem={removeItem}
                                       item={item}
                                       i={i}
                                    />
                                 </li>
                              )
                           }
                        </ul>
                     </div>
                     <div className='Bill__total'>
                        <label htmlFor='comments'>
                           Comentarios:
                           <textarea
                              name='comments'
                              value={form.comments}
                              placeholder=''
                              onChange={handleInput}
                           />
                        </label>
                        <div>
                           <label htmlFor='ivaPorcent'>
                              IVA
                              <input
                                 type='number'
                                 min='0'
                                 value={form.ivaPorcent}
                                 name='ivaPorcent'
                                 placeholder='IVA'
                                 onChange={handleInput}
                              />
                              %
                              <span>${ivaResult}</span>
                           </label>
                           <p>
                              <span>Subtotal</span>
                              <span>${form.subtotal}</span>
                           </p>
                           <p>
                              <span>Total</span>
                              <span>${form.total}</span>
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className='Bill__buttons'>
                     <button type='submit'>Enviar</button>
                  </div>
               </form>
            </article>
         </section>
      </>
   );
};

Bill.propTypes = {
   fullNameValidate: PropTypes.bool,
   emailValidate: PropTypes.bool,
   fiscalIdValidate: PropTypes.bool,
   modal: PropTypes.bool,
   CFDIValidate: PropTypes.bool,
   loaderCustomer: PropTypes.bool.isRequired,
   form: PropTypes.objectOf(
      PropTypes.string || object
   ),
   formProduct: PropTypes.arrayOf(
      PropTypes.object
   ),
   customers: PropTypes.objectOf(
      PropTypes.array
   ),
   article: PropTypes.objectOf(
      PropTypes.any
   ).isRequired,
   addItem: PropTypes.func,
   removeItem: PropTypes.func,
   handleInput: PropTypes.func,
   handleInputProduct: PropTypes.func,
   handleSubmit: PropTypes.func,
   handleModal: PropTypes.func,
   handleInputCustomer: PropTypes.func,
   getDataCustomerId: PropTypes.func,
}

export default Bill;