import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/styles/components/Bill/BillItemAdded.scss';

const BillItemAdded = (props) => {

   const {
      i,
      item,
      removeItem
   } = props;
   window.console.log(item);

   const total = item.price * item.quantity;

   return (
      <div className='Bill__item-added'>
         <div>
            <p>{item.product}</p>
         </div>
         <div>
            <p>{item.id}</p>
         </div>
         <div>
            <p>${item.price}</p>
         </div>
         <div>
            <p>{item.description}</p>
         </div>
         <div>
            <p>{item.quantity}</p>
         </div>
         <span>
            <p>${total}</p>
         </span>
         <button type='button' onClick={() => removeItem(i)}>X</button>
      </div>
   );
}

BillItemAdded.propTypes = {
   item: PropTypes.objectOf(
      PropTypes.any
   ).isRequired,
   i: PropTypes.number.isRequired,
   removeItem: PropTypes.func.isRequired
}

export default BillItemAdded;