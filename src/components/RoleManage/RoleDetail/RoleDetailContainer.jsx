/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import RoleDetail from './RoleDetail';
import GetData from '../../../containers/GetData';

// import mockRoles from '../../../../mockRoles';

// Aquí vamos a hacer las peticiones de los detalles de cada rol

const RoleDetailContainer = (props) => {

   const {
      history,
      match,
   } = props;
   const [modal, setModal] = useState(false)
   const [form, setValues] = useState({});
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const idUser = match.params.id;

   const handleChangeInput = (e) => {

      if(e.target.name === 'role') {
         setValues({
            ...form,
            [e.target.name]: e.target.value,
         })
      } else {
         setValues({
            ...form,
            [e.target.name]: e.target.checked,
         })
      }
   }
   window.console.log(form);

   window.console.log(match.params.id)

   const handleModalOpen = () => {
      setModal(true);
   }

   const handleModalClose = () => {
      setModal(false)
   }

   const goBack = () => {
      history.goBack()
   }

   // const { roles } = mockRoles;
   return (
      <GetData api={`${API}superAdmin/get-user/${idUser}`}>
         {
            ({ loading, error, data}) => {
               if(error) return <p>¡Error!</p>
               return(
                  <RoleDetail
                  user={data[0]}
                  loading={loading}
                  handleChangeInput={handleChangeInput}
                  handleModalOpen={handleModalOpen}
                  handleModalClose={handleModalClose}
                  modalIsOpen={modal}
                  form={form}
                  goBack={goBack}
               />
               )
            }
         }
      </GetData>
   )
};

export default RoleDetailContainer