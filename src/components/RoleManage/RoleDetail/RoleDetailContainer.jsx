/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import RoleDetail from './RoleDetail';

const RoleDetailContainer = (props) => {

   const {
      history,
      match,
   } = props;
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const TFAToken = window.sessionStorage.getItem('TFAToken');
   const idUser = match.params.id;
   const [modal, setModal] = useState(false);
   const [editRole, setEditRole] = useState(false);
   const [loader, setLoader] = useState(false);
   const [dataDetail, setDataDetail] = useState({});
   const [loading, setLoading] = useState(true);
   const [saved, setSaved] = useState(false);
   const [form, setValues] = useState({});

   const handleClickEdit = () => {
      if (editRole) {
         setEditRole(false)
      } else {
         setEditRole(true)
      }
   }
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

   // window.console.log(form.role.length);
   window.console.log(form);
   const handleSubmit = e => {
      e.preventDefault();
      const putData = async () => {
         setLoader(true);
         try {
            window.console.log(form);
            const response = await fetch(`${API}superAdmin/userEditRol/${idUser}`, {
               method: 'PUT',
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${TFAToken}`,
               },
               body: JSON.stringify(form)
            });
            const { message } = await response.json();
            if (message === 'User updated') {
               setLoader(false)
               setSaved(true);
            }
         } catch(error) {
            window.console.log(error)
         }
      }
         putData();
   }

   const handleModalOpen = () => {
      setModal(true);
   }
   const handleModalClose = () => {
      setModal(false)
   }
   const goBack = () => {
      history.goBack()
   }
   useEffect(() => {
      const getData = async () => {
         try {
            const response = await fetch(`${API}superAdmin/get-user/${idUser}`);
            const data = await response.json();
            window.console.log(data[0])
            setDataDetail(data[0]);
            form.twoFactorActive = await data[0].twoFactorActive

            setLoading(false);
         } catch(error) {
            window.console.log(error)
         }
      }
      getData();
   }, [])

   return (
      <RoleDetail
      user={dataDetail}
      loading={loading}
      handleChangeInput={handleChangeInput}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      modalIsOpen={modal}
      form={form}
      saved={saved}
      goBack={goBack}
      handleClickEdit={handleClickEdit}
      editRole={editRole}
      loader={loader}
      handleSubmit={handleSubmit}
   />
   )
};

export default RoleDetailContainer