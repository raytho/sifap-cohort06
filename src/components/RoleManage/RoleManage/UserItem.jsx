/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import UserDeleteModal from './UserDeleteModal';

import '../../../assets/styles/components/RoleManage/ItemUser.scss';

const UserItem = (props) => {

   const {
      data,
   } = props;
   const [modal, setModal] = useState(false);
   const [userId, setUserId] = useState('');
   const type = 'user';

   const handleModalOpen = id => {
      setModal(true);
      setUserId(id);
      window.console.log(id);
   }
   const handleModalClose = () => {
      setModal(false)
   }
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
               <button type='button' onClick={() => handleModalOpen(item.userId)}>X</button>
            </li>
         )
      }
      <UserDeleteModal
         handleModalClose={handleModalClose}
         modalIsOpen={modal}
         endpoint={`superAdmin/user/${userId}`}
         type={type}
      />
    </ul>
   );
}


UserItem.propTypes = {
   data: PropTypes.arrayOf(PropTypes.shape())

}

export default UserItem;