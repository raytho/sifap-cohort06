/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'

import GetData from '../../../containers/GetData';
import RoleDeleteModal from './UserGestionModal';
import '../../../assets/styles/components/RoleManage/ItemUser.scss';


const UserItemInvited = () =>{
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/superAdmin/'

   const [modal, setModal] = useState(false);
   const handleModalOpen = () => {
      setModal(true)
   }
   const handleModalClose = () => {
      setModal(false)
   }
   return (
      <GetData api={`${API}getInvitedUsers`} >
         {
            ({ loading, error, data}) => {
               if (loading) return <p>Cargando...</p>
               if (error) return <p>¡Error!</p>
               window.console.log(data[0].userId)

               return (
                <ul>
                  {
                     data.map(item =>
                        <li key={item.userId} className='Role__item'>
                           <div>
                              <span className='Role__item-body'>
                                 <p>{item.role}</p>
                                 <p>{item.userId}</p>
                                 <p>{item.firstName} {item.lastName}</p>
                                 <span>Invitado</span>
                              </span>
                           </div>
                           <button type='button' onClick={handleModalOpen}>X</button>
                        </li>
                     )
                  }
                  <RoleDeleteModal
                     handleModalClose={handleModalClose}
                     modalIsOpen={modal}
                     endpoint={`superAdmin/users-invitation/${data[0].userId}`}
                  />
                </ul>
               )
            }
         }
      </GetData>
   )
}

export default UserItemInvited;