/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/styles/components/Bill/BillItem.scss';

const BillItem = (props) => {

   const {
      i,
      removeItem,
      handleInputProduct
   } = props;

   return (
      <div className='Bill__item'>
         <label htmlFor='product'>
            <input
               type='text'
               name='product'
               placeholder='Producto'
               onChange={handleInputProduct}
            />
         </label>
         <label htmlFor='id'>
            <input
               type='text'
               name='id'
               placeholder='ID'
               onChange={handleInputProduct}
            />
         </label>
         <label htmlFor='price'>
            <input
               type='number'
               name='price'
               placeholder='Precio'
               onChange={handleInputProduct}
            />
         </label>
         <label htmlFor='description'>
            <input
               type='text'
               name='description'
               placeholder='Descripción'
               onChange={handleInputProduct}
            />
         </label>
         <label htmlFor='quantity'>
            <input
               type='number'
               min='0'
               name='quantity'
               placeholder='Cantidad'
               onChange={handleInputProduct}
            />
         </label>
         <span>
            <p>$0</p>
         </span>
         <button type='button' onClick={() => removeItem(i)}>X</button>
      </div>
   );
}

BillItem.propTypes = {
   i: PropTypes.number,
   removeItem: PropTypes.func,
   handleInputProduct: PropTypes.func
}

export default BillItem;