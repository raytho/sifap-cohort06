/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import '../assets/styles/layout/Modal.scss';

const Modal = (props) => {

   const {
      children,
      isOpen,
      isModalAddRole,
      isConfirmation,
      LoginModal,
      handleModalClose
   } = props;

   const modalClass = classNames('Modal', {
      isModalAddRole,
      isConfirmation,
      LoginModal
   });


   if (!isOpen) {
      return null;
   }

   return (
      ReactDOM.createPortal(
         <>
         <div  className='Modal__overlay' >
            <div role='button' tabIndex='0' className='close' onClick={handleModalClose}> </div>
            <div className={modalClass} id='modal'>
               {children}
            </div>
         </div>
         </>,
         document.getElementById('modal')
      )
   );
}
export default Modal;
