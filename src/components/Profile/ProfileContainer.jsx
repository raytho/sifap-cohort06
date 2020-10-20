import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../Context';
import Profile from './Profile';

const ProfileContainer = () => {

   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const user = JSON.parse(window.sessionStorage.getItem('user'));
   const token = window.sessionStorage.getItem('token');
   const controller = new AbortController();
   const { setUser } = useContext(Context);
   const [qr, setQr] = useState();
   const [loader, setLoader] = useState(false);
   const [saved, setSaved] = useState(false);
   const [notSaved, setNotSaved] = useState(false);
   const [form, setValues] = useState({
      firstName: user.firstName,
      dateOfBirth: user.dateOfBirth,
      city: user.city,
      state: user.state,
      country: user.country,
      fiscalId: user.fiscalId,
      phoneNumber: user.phoneNumber,
      twoFactorActive: user.twoFactorActive
   });
   const handleChangeInput = e => {
      if (e.target.name === 'twoFactorActive') {
         setValues({
            ...form,
            [e.target.name]: e.target.checked
         })
      } else {
         setValues({
            ...form,
            [e.target.name]: e.target.value
         })
      }
   }
   useEffect(() => {
      user.firstName = form.firstName;
      user.dateOfBirth = form.dateOfBirth;
      user.city = form.city;
      user.state = form.state;
      user.country = form.country;
      user.fiscalId = form.fiscalId;
      user.phoneNumber = form.phoneNumber;
      setUser(JSON.stringify(user));
   }, [form])
   const handleSubmit = e => {
      e.preventDefault();
      const putData = async () => {
         user.twoFactorActive = form.twoFactorActive;
         setUser(JSON.stringify(user));
         try {
            setLoader(true);
            await fetch(`${API}user/data/profile`, {
               method: 'PUT',
               headers: {
                  'Accept': 'application/json',
                 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
               },
               body: JSON.stringify(form)
            })
            .then(async response => {
               const { data: { message: { status }  }} = await response.json();
               if (status === 'Saved') {
                  setSaved(true);
                  setLoader(false);
               } else {
                  setNotSaved(true);
                  setLoader(false);
               }
            }).catch(error => window.console.log(error));
         } catch(error) {
            window.console.log(error);
            setLoader(false);
         }
         // try {
         //    setLoader(true);
         //    await fetch(`${API}auth/two-factor-activate`, {
         //       method: 'POST',
         //       headers: {
         //          'Accept': 'application/json',
         //          'Content-Type': 'application/json',
         //          'Authorization': `Bearer ${token}`,
         //       },
         //       body: JSON.stringify(form),
         //    })
         //    .then(async response => {
         //       const { data: { message } } = await response.json();
         //       if (message === '2FA value has change') {
         //          setSaved(true);
         //          setLoader(false);
         //       } else {
         //          setNotSaved(true);
         //          setLoader(false);
         //       }
         //    })
         // } catch(error) {
         //    window.console.log(error);
         //    setLoader(false);
         // }
      }
      putData()
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
   }, []);

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