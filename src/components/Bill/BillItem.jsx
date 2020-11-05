/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/styles/components/Bill/BillItem.scss';

const BillItem = (props) => {

   const {
      article,
      addItem,
      handleInputProduct
   } = props;

   window.console.log(article)

   const total = article.price * article.quantity;
   article.total = total;

   return (
      <div className='Bill__item-container'>
         <div className='Bill__item'>
            <label htmlFor='product'>
               <input
                  type='text'
                  value={article.product}
                  name='product'
                  placeholder='Producto'
                  onChange={handleInputProduct}
               />
            </label>
            <label htmlFor='id'>
               <input
                  type='text'
                  value={article.id}
                  name='id'
                  placeholder='ID'
                  onChange={handleInputProduct}
               />
            </label>
            <label htmlFor='price'>
               <input
                  type='number'
                  value={article.price}
                  name='price'
                  placeholder='Precio unidad'
                  onChange={handleInputProduct}
               />
            </label>
            <label htmlFor='description'>
               <input
                  type='text'
                  value={article.description}
                  name='description'
                  placeholder='Descripción'
                  onChange={handleInputProduct}
               />
            </label>
            <label htmlFor='quantity'>
               <input
                  type='number'
                  value={article.quantity}
                  min='0'
                  name='quantity'
                  placeholder='Cantidad'
                  onChange={handleInputProduct}
               />
            </label>
            <label htmlFor='unit'>
               <input
                  type='text'
                  value={article.unit}
                  name='unit'
                  placeholder='kg, lb, gr'
                  onChange={handleInputProduct}
               />
            </label>
            <span>
               <p>${article.total}</p>
            </span>
            {/* <button type='button' onClick={() => removeItem(i)}>X</button> */}
         </div>
         <button
            className='Bill__add-item'
            type='button'
            onClick={addItem}
         >+</button>
      </div>
   );
}

BillItem.propTypes = {
   handleInputProduct: PropTypes.func,
   addItem: PropTypes.func,
   article: PropTypes.objectOf(
      PropTypes.any
   ).isRequired,
}

export default BillItem;