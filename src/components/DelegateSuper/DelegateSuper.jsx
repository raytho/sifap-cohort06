/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import Delegate from './Delegate';
import DelegateModal from './DelegateModal';

import '../../assets/styles/components/DelegateSuper/DelegateSuper.scss';


const DelegateSuper = (props) => {

   const  {
      handleSubmit,
      handleChangeInput,
      handleModalOpen,
      handleModalClose,
      modalIsOpen,
      form,
      nameValidate,
      emailValidate,
      accountValidate
      // confirmSendForm,
   } = props;

   return (
      <Delegate >
         <section className='DelegateSuper'>
            <div className='DelegateSuper__form'>
               <h3>Delegar Rol Super Administrador</h3>
               <form onSubmit={handleSubmit}>
                  <label htmlFor='name'> Nombre: <i>*</i>
                     {nameValidate &&
                        <p className='alert-form'>Nombre debe tener minimo primer nombre y primer apellido</p>}
                     <input
                        type='text'
                        name='name'
                        value={form.name}
                        placeholder='Nombre'
                        onChange={handleChangeInput}
                     />
                  </label>
                  <label htmlFor='email'> Correo: <i>*</i>
                     {emailValidate && <p className='alert-form'>Formato de correo ejemplo@correo.com</p>}

                     <input
                        type='email'
                        name='email'
                        value={form.email}
                        placeholder='ejemplo@correo.com'
                        onChange={handleChangeInput}
                     />
                  </label>

                  <div>
                     <p>¿Qué quieres hacer con esta cuenta? <i>*</i></p>
                     <label className='radio'>
                        <input
                           type='radio'
                           name='account'
                           value='admin'
                           onChange={handleChangeInput}
                           />
                        <span className='radiomark'> </span>
                        Administrador
                     </label>
                     <label className='radio'>
                        <input
                           type='radio'
                           name='account'
                           value='employee'
                           onChange={handleChangeInput}
                           />
                        <span className='radiomark'> </span>
                        Empleado
                     </label>
                     <label className='radio'>
                        <input
                           type='radio'
                           name='account'
                           value='delete'
                           onChange={handleChangeInput}
                        />
                        <span className='radiomark'> </span>
                        Eliminar cuenta
                     </label>
                     {accountValidate &&
                        <p className='alert-form'>Seleccione qué quiere hacer con su cuenta actual</p>}
                  </div>
                  <button type='submit' onClick={handleModalOpen}>Aceptar</button>
                  <DelegateModal
                     isOpen={modalIsOpen}
                     handleModalClose={handleModalClose}
                     // confirmSendForm={confirmSendForm}
                  />
               </form>

            </div>
         </section>
      </Delegate>
   )
}

export default DelegateSuper;