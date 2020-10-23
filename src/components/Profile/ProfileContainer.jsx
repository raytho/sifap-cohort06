/* eslint-disable camelcase */
import React, { useState, useContext, useEffect, createRef } from 'react';
import { Context } from '../../Context';
import Profile from './Profile';

const ProfileContainer = () => {

   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const user = JSON.parse(window.sessionStorage.getItem('user'));
   const token = window.sessionStorage.getItem('token');
   const controller = new AbortController();
   const inputFile = createRef();
   const { setUser, setUserImg } = useContext(Context);
   const [qr, setQr] = useState();
   const [loader, setLoader] = useState(false);
   const [loaderImg, setLoaderImg] = useState(false);
   const [saved, setSaved] = useState(false);
   const [notSaved, setNotSaved] = useState(false);
   const [image, setImage] = useState();
   const [uploadedImg, setUploadImg] = useState();
   const [addImage, setAddImg] = useState(false);
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

   const regExpDate = (/^(\d{4})-(\d{2})-(\d{2})$/).test(form.dateOfBirth)
   window.console.log(regExpDate)
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

      }
      if (regExpDate) {
         putData();
      }
   }
   const handleInputImg = () => {
      const formData = new FormData();
      formData.append('image', inputFile.current.files[0]);
      const file = formData.get('image')
      const img = URL.createObjectURL(file);
      window.console.log(img)
      setUserImg(img);
   }

   const handleSubmitImg = e => {
      e.preventDefault();
      const formDataSubmit = new FormData();
      formDataSubmit.append('image', inputFile.current.files[0]);
      const postImg = async () => {
         try {
            setLoaderImg(true);
            await fetch(`${API}user/data/profile-image`, {
               method: 'POST',
               headers: {
                  'Authorization': `Bearer ${token}`,
               },
               body: formDataSubmit,
            })
            .then(async response => {
               const { profile_picture_url, uploaded } = await response.json();
               user.profile_picture_url = profile_picture_url;
               if (uploaded) {
                  // setAddImg(false);
                  setLoaderImg(false);
               } else {
                  setLoaderImg(false);
               }
               setImage(profile_picture_url);
               setUserImg(profile_picture_url)
               setUploadImg(uploaded);
            })
         } catch(error) {
            window.console.log(error);
         }
      }
         postImg();
   }
   useEffect(() => {
      user.firstName = form.firstName;
      user.dateOfBirth = form.dateOfBirth;
      user.city = form.city;
      user.state = form.state;
      user.country = form.country;
      user.fiscalId = form.fiscalId;
      user.phoneNumber = form.phoneNumber;
      user.profile_picture_url = image || user.profile_picture_url
      setUser(JSON.stringify(user));
   }, [form, image]);
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
   const handleClickAdd = () => {
      if(addImage) {
         setAddImg(false);
         setUploadImg(undefined);
      } else {
         setAddImg(true);
      }
   }
   return (
      <Profile
         handleChangeInput={handleChangeInput}
         handleSubmit={handleSubmit}
         handleSubmitImg={handleSubmitImg}
         handleClickAdd={handleClickAdd}
         handleInputImg={handleInputImg}
         addImage={addImage}
         form={form}
         qr={qr}
         loader={loader}
         saved={saved}
         notSaved={notSaved}
         inputFile={inputFile}
         image={image}
         uploadedImg={uploadedImg}
         loaderImg={loaderImg}
      />
   );
}

export default ProfileContainer;