/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import UserGestionModal from './UserGestionModal';

import '../../../assets/styles/components/RoleManage/ItemUser.scss';

const UserItem = (props) => {

   const {
      data

   } = props;

   const [modal, setModal] = useState(false);
   const handleModalOpen = () => {
      setModal(true)
   }
   const handleModalClose = () => {
      setModal(false)
   }
   window.console.log();
   return (
    <ul>
      {
         data.map(item =>
            <li key={item.userId} className='Role__item'>
               <div>
                  <Link  to={`/role-detail/${item.userId}`}>
                     <div>
                        <span>
                           <p>{item.role}</p>
                           <p>{item.userId}</p>
                           <p>{item.firstName} {item.lastName}</p>
                        </span>
                     </div>
                  </Link>
               </div>
               <button type='button' onClick={handleModalOpen}>X</button>
            </li>
         )
      }
      <UserGestionModal
         handleModalClose={handleModalClose}
         modalIsOpen={modal}
         endpoint={`superAdmin/user/${data.map(item => item.userId)}`}
      />
    </ul>
   );
}


UserItem.propTypes = {
   data: PropTypes.arrayOf(PropTypes.shape())

}

export default UserItem;