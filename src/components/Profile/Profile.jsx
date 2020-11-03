/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Title from '../Title';
import ProfileImgModal from './ProfileImgModal';

import '../../assets/styles/components/Profile/Profile.scss';
import iconEdit from '../../assets/static/icon/edit.png';
import iconSaveDos from '../../assets/static/icon/save-dos.png';
import iconSave from '../../assets/static/icon/save.png';
import userProfile from '../../assets/static/icon/user-profile.png';

const Profile = (props) => {

   const {
      handleChangeInput,
      handleSubmit,
      handleSubmitImg,
      handleClickAdd,
      handleInputImg,
      countries,
      form,
      qr,
      loader,
      saved,
      notSaved,
      inputFile,
      image,
      addImage,
      uploadedImg,
      loaderImg
   } = props;
   const [name, setName] = useState(false);
   const [dateOfBirth, setDateOfBirth] = useState(false);
   const [city, setCity] = useState(false);
   const [country, setCountry] = useState(false);
   const [fiscalId, setFiscalId] = useState(false);
   const [phoneNumber, setPhoneNumber] = useState(false);
   const [companyName, setCompanyName] = useState(false);
   const user = JSON.parse(window.sessionStorage.getItem('user'));
   const handleEditClick = (state, setState, setState2, setState3, setState4, setState5, setState6, setState7) => {
      if(state) {
         setState(false);
      } else {
         setState(true);
         setState2(false);
         setState3(false);
         setState4(false);
         setState5(false);
         setState6(false);
         setState7(false);
      }
   }

   useEffect(() => {
      if (name) {
         document.getElementById('input-name').focus();
      }
      if (dateOfBirth) {
         document.getElementById('input-birth').focus();
      }
      if (city) {
         document.getElementById('input-city').focus();
      }
      if (country) {
         document.getElementById('input-country').focus();
      }
      if (fiscalId) {
         document.getElementById('input-fiscalId').focus();
      }
      if (phoneNumber) {
         document.getElementById('input-phone').focus();
      }
      if (companyName) {
         document.getElementById('input-company').focus();
      }
   }, [name, dateOfBirth, city, country, fiscalId, phoneNumber, companyName]);

   useEffect(() => {
      document.getElementById('form').addEventListener('keypress', e => {
         if (e.code === 'Enter') {
            e.preventDefault();
         }
      })
   }, []);
   return (
      <>
         <Title icon={userProfile} title='Perfil' />
         <div className='Profile__panel'>
            <div className='Profile__header'>
               <p>{user.role}</p>
            </div>
            <div className='Profile__main' >
               <ProfileImgModal
                  handleSubmitImg={handleSubmitImg}
                  handleClickAdd={handleClickAdd}
                  handleInputImg={handleInputImg}
                  image={image}
                  user={user}
                  addImage={addImage}
                  iconSaveDos={iconSaveDos}
                  loaderImg={loaderImg}
                  inputFile={inputFile}
                  uploadedImg={uploadedImg}
               />
               <div className='Profile__img'>
               <img
                  src={
                     image === undefined
                     ? user.profile_picture_url
                     : image
                  }
                  alt='Foto de perfil'
               />
               <button type='button' onClick={handleClickAdd}>+</button>
               </div>
               <form  onSubmit={handleSubmit} id='form'>
                  <div>
                     <div className='Profile__item'>
                        <div>
                           <p>Nombre: </p>
                        </div>
                        <div>
                           {
                              name
                              ? <>
                              <input
                                 id='input-name'
                                 value={form.firstName}
                                 type='text'
                                 name='firstName'
                                 placeholder='Nombre'
                                 onChange={handleChangeInput}
                              />
                              <input
                                 value={form.lastName}
                                 type='text'
                                 name='lastName'
                                 placeholder='Apellido'
                                 onChange={handleChangeInput}
                              />
                              </>
                              : <p>{user.firstName} {user.lastName}</p>
                           }
                           <button
                              type='button'
                              className='Profile__edit'
                              onClick={() =>
                                 handleEditClick(
                                    name,
                                    setName,
                                    setDateOfBirth,
                                    setCity,
                                    setCountry,
                                    setFiscalId,
                                    setPhoneNumber,
                                    setCompanyName
                                 )
                              }
                           >
                              {
                                 name
                                 ? <img src={iconSave} alt='icono de editar'/>
                                 : <img src={iconEdit} alt='icono de editar'/>
                              }
                           </button>
                        </div>
                     </div>
                     <div className='Profile__item'>
                        <div>
                           <p>Fecha de nacimiento: </p>
                        </div>
                        <div>
                           {
                              dateOfBirth
                              ? <input
                                 id='input-birth'
                                 value={form.dateOfBirth}
                                 type='date'
                                 name='dateOfBirth'
                                 onChange={handleChangeInput}
                              />
                              : <p>{user.dateOfBirth}</p>
                           }
                           <button
                              type='button'
                              className='Profile__edit'
                              onClick={() =>
                                 handleEditClick(
                                    dateOfBirth,
                                    setDateOfBirth,
                                    setName,
                                    setFiscalId,
                                    setCity,
                                    setCountry,
                                    setPhoneNumber,
                                    setCompanyName
                                 )
                              }
                           >
                              {
                                 dateOfBirth
                                 ? <img src={iconSave} alt='icono de editar'/>
                                 : <img src={iconEdit} alt='icono de editar'/>
                              }
                           </button>
                        </div>
                     </div>
                     <div className='Profile__item'>
                        <div>
                           <p>Nombre de la empresa: </p>
                        </div>
                        <div>
                           {
                              companyName
                              ? <input
                                    id='input-company'
                                    value={form.companyName}
                                    type='text'
                                    name='companyName'
                                    placeholder='Nombre de la empresa'
                                    onChange={handleChangeInput}
                                 />
                              : <p>{user.companyName}</p>
                           }
                           <button
                              type='button'
                              className='Profile__edit'
                              onClick={() =>
                                 handleEditClick(
                                    companyName,
                                    setCompanyName,
                                    setPhoneNumber,
                                    setCity,
                                    setCountry,
                                    setDateOfBirth,
                                    setName,
                                    setFiscalId,
                                 )
                              }
                           >
                              {
                                 companyName
                                 ? <img src={iconSave} alt='icono de editar'/>
                                 : <img src={iconEdit} alt='icono de editar'/>
                              }
                           </button>
                        </div>
                     </div>
                     <div className='Profile__item'>
                        <div>
                           <p>{
                              user.fiscalIdentifierName
                                 ? user.fiscalIdentifierName
                                 : 'Identificador fiscal:'
                           }</p>
                        </div>
                        <div>
                           {
                              fiscalId
                              ? <input
                                 id='input-fiscalId'
                                 value={form.fiscalId}
                                 type='text'
                                 name='fiscalId'
                                 placeholder='N° de indetificación'
                                 onChange={handleChangeInput}
                              />
                              : <p>{user.fiscalId}</p>
                           }
                           <button
                              type='button'
                              className='Profile__edit'
                              onClick={() =>
                                 handleEditClick(
                                    fiscalId,
                                    setFiscalId,
                                    setName,
                                    setDateOfBirth,
                                    setCity,
                                    setCountry,
                                    setPhoneNumber,
                                    setCompanyName
                                 )
                              }
                           >
                              {
                                 fiscalId
                                 ? <img src={iconSave} alt='icono de editar'/>
                                 : <img src={iconEdit} alt='icono de editar'/>
                              }
                           </button>
                        </div>
                     </div>
                     <div className='Profile__item'>
                        <div>
                           <p>País: </p>
                        </div>
                        <div>
                           {
                              country
                              ? <>
                                 <select
                                    id='input-country'
                                    name='country'
                                    onChange={handleChangeInput}
                                 >
                                 <option value=''>País</option>
                                 {
                                    countries.map((item) =>
                                       <option key={item.idcountries} value={item.code}>{item.name}</option>
                                    )
                                 }
                                 </select>
                              </>
                              : <p>{user.country}</p>
                           }
                           <button
                              type='button'
                              className='Profile__edit'
                              onClick={() =>
                                 handleEditClick(
                                    country,
                                    setCountry,
                                    setDateOfBirth,
                                    setName,
                                    setFiscalId,
                                    setCity,
                                    setPhoneNumber,
                                    setCompanyName
                                 )
                              }
                           >
                              {
                                 country
                                 ? <img src={iconSave} alt='icono de editar'/>
                                 : <img src={iconEdit} alt='icono de editar'/>
                              }
                           </button>
                        </div>
                     </div>
                     <div className='Profile__item'>
                        <div>
                         <p>Ciudad: </p>
                        </div>
                        <div>
                           {
                              city
                              ? <>
                                 <input
                                    id='input-city'
                                    value={form.city}
                                    type='text'
                                    name='city'
                                    placeholder='Ciudad'
                                    onChange={handleChangeInput}
                                 />
                                 <input
                                    value={form.state}
                                    type='text'
                                    name='state'
                                    placeholder='Estado, provincia'
                                    onChange={handleChangeInput}
                                 />
                              </>
                              : <p>{user.state.length < 1 ? `${user.city}` : `${user.city}, ${user.state}`}</p>
                           }
                           <button
                              type='button'
                              className='Profile__edit'
                              onClick={() =>
                                 handleEditClick(
                                    city,
                                    setCity,
                                    setCountry,
                                    setDateOfBirth,
                                    setName,
                                    setFiscalId,
                                    setPhoneNumber,
                                    setCompanyName
                                 )
                              }
                           >
                              {
                                 city
                                 ? <img src={iconSave} alt='icono de editar'/>
                                 : <img src={iconEdit} alt='icono de editar'/>
                              }
                           </button>
                        </div>
                     </div>
                  </div>
                  {/* Seguridad */}
                  <div>
                     <div className='Profile__item'>
                        <div>
                           <p>Número de telefono: </p>
                        </div>
                        <div>
                           {
                              phoneNumber
                              ? <input
                                    id='input-phone'
                                    value={form.phoneNumber}
                                    type='text'
                                    name='phoneNumber'
                                    placeholder='N° de teléfono'
                                    onChange={handleChangeInput}
                                 />
                              : <p>{user.phoneNumber}</p>
                           }
                           <button
                              type='button'
                              className='Profile__edit'
                              onClick={() =>
                                 handleEditClick(
                                    phoneNumber,
                                    setPhoneNumber,
                                    setCity,
                                    setCountry,
                                    setDateOfBirth,
                                    setName,
                                    setFiscalId,
                                    setCompanyName
                                 )
                              }
                           >
                              {
                                 phoneNumber
                                 ? <img src={iconSave} alt='icono de editar'/>
                                 : <img src={iconEdit} alt='icono de editar'/>
                              }
                           </button>
                        </div>
                     </div>
                     <div className='Profile__authentication'>
                        <h3>Seguridad:</h3>
                        <div>
                           <p>
                              <span>Activa autenticación en 2 pasos e inicia sesión con tus credenciales y un código de seguridad el cual puedes obtener de dos formas y así elegir una de ellas al iniciar sesión:</span>
                           </p>
                           <div>
                              <p>
                                 <span>1.</span> Usa <a href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=es_EC'>Google Authenticator</a> para escanear el código QR y te dará el código.
                              </p>
                                 <div className='Profile__QR'>
                                 <p>Código QR:</p>
                                 <div>
                                    <img src={qr} alt='Código QR'/>
                                 </div>
                                 </div>
                              <p>
                                 <span>2.</span> Recibir un mensaje con el código a tu correo de registro.
                              </p>
                           </div>
                           <p>
                              <span>¡Recuerda!</span>
                           </p>
                           <p>
                              Si ya escaneaste el código QR, Google Athenticator lo guardará y lo estará generando cada 30 segundos.
                           </p>
                           <p>
                           Al iniciar sesión podrás elegir el método autenticación, si no has escaneado el código QR lo puedes hacer por correo y si ya lo escaneaste tu eliges el método.
                           </p>
                           <label className='check'>Activar Autenticación
                              <input
                                 type='checkbox'
                                 name='twoFactorActive'
                                 value={form.twoFactorActive}
                                 onChange={handleChangeInput}
                                 checked={form.twoFactorActive ? true : false}
                                 />
                              <span className='checkmark' />
                           </label>
                        </div>
                     </div>
                     <div className='Profile__button-container'>
                        <div className='Profile__result'>
                           {loader && <p>Cargando...</p>}
                           <p>{saved &&  'Se guardaron los cambios'}</p>
                           <p>{notSaved &&  'No se se guardaron los cambios'}</p>
                        </div>
                        <button  type='submit'>Guardar</button>
                     </div>
                  </div>
               </form>
            </div>

         </div>
      </>
   )
}

Profile.propTypes = {
   handleChangeInput: PropTypes.func.isRequired,
   handleSubmit: PropTypes.func.isRequired,
   handleSubmitImg: PropTypes.func.isRequired,
   handleClickAdd: PropTypes.func.isRequired,
   handleInputImg: PropTypes.func.isRequired,
   countries: PropTypes.func.isRequired,
   form: PropTypes.object.isRequired,
   inputFile: PropTypes.object.isRequired,
   image: PropTypes.string || undefined.isRequired,
   qr: PropTypes.string,
   loader: PropTypes.bool,
   saved: PropTypes.bool,
   notSaved: PropTypes.bool,
   addImage: PropTypes.bool,
   uploadedImg: PropTypes.bool,
   loaderImg: PropTypes.bool

}

export default Profile;