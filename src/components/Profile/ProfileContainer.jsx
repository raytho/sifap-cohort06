import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../Context';
import Profile from './Profile';

const ProfileContainer = () => {

   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const user = JSON.parse(window.sessionStorage.getItem('user'));
   const token = window.sessionStorage.getItem('token');
   const [qr, setQr] = useState();
   const [loader, setLoader] = useState(false)
   const [saved, setSaved] = useState(false)
   const [notSaved, setNotSaved] = useState(false)
   const controller = new AbortController();
   const { setUser } = useContext(Context);
   const [form, setValues] = useState({
      isActive: user.twoFactorActive
   });
   const handleChangeInput = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.checked
      })
   }
   const handleSubmit = e => {
      e.preventDefault();
      const postData = async () => {
         user.twoFactorActive = form.isActive
         setUser(JSON.stringify(user));
         try {
            setLoader(true);
            await fetch(`${API}auth/two-factor-activate`, {
               method: 'POST',
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
               },
               body: JSON.stringify(form),
            })
            .then(async response => {
               const { data: { message } } = await response.json();
               if (message === '2FA value has change') {
                  setSaved(true);
                  setLoader(false);
               } else {
                  setNotSaved(true);
                  setLoader(false);
               }
            })
         } catch(error) {
            window.console.log(error, 'este');
         }
      }
      postData()
   }

   useEffect(() => {
      const getData = async () => {
         try{
            const response = await fetch(`${API}user/settings/send-qr`, {
               method: 'GET',
               headers: {
                  'Authorization': `Bearer ${token}`
               },
               signal: controller.signal,
            })
            const {message} = await response.json();
            setQr(message);
         } catch(error) {
            window.console.log(error);
         }
      }
      getData()

      return () => controller.abort();
   }, [])
   return (
      <Profile
         handleChangeInput={handleChangeInput}
         handleSubmit={handleSubmit}
         form={form}
         qr={qr}
         loader={loader}
         saved={saved}
         notSaved={notSaved}
      />
   );
}

export default ProfileContainer;