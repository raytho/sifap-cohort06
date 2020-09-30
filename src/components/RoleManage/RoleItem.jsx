/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import RoleDeleteModal from './RoleDeleteModal';

import '../../assets/styles/components/RoleManage/RoleItem.scss';

const RoleItem = (props) => {

   const {
      userId,
      role,
      firstName,
      lastName,

   } = props;

   const [modal, setModal] = useState(false);
   // const handleModalOpen = () => {
   //    setModal(true)
   // }
   const handleModalClose = () => {
      setModal(false)
   }

   const deleteUser = () => {
      const getData = async () => {

         try {
            await fetch('url',{
               method: 'DELETE',
            });

         } catch (error) {
            window.console.log(error.message);
         }
      };
      getData()
   }

   return (
   <div className='Role__item'>
      <div>
         <Link to={`/role-detail/${userId}`}>
            <span>
               <p>{role}</p>
               <p>{userId}</p>
               <p>{firstName} {lastName}</p>
            </span>
         </Link>
         <button type='button' onClick={deleteUser}>X</button>
         <RoleDeleteModal
            handleModalClose={handleModalClose}
            modalIsOpen={modal}
         />
      </div>
   </div>
   );
}
RoleItem.propTypes = {
   userId: PropTypes.number,
   role: PropTypes.string,
   firstName: PropTypes.string,
   lastName: PropTypes.string,

}

export default RoleItem;