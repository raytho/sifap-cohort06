/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import Title from '../Title';

import '../../assets/styles/components/Profile/Profile.scss';
import iconEdit from '../../assets/static/icon/edit.png';
import userProfile from '../../assets/static/icon/user-profile.png';

const propsProfile = {
   title: 'Perfil',
   icon: userProfile,
   alt: 'Icono perfil'
};
const DEFAULT_IMG_USER = 'https://i.imgur.com/JlR3iZD.png';

const Profile = (props) => {

   const {
      handleChangeInput,
      handleSubmit,
      form,
      qr,
      loader,
      saved,
      notSaved
   } = props;

   return(
      <>
         <Title {...propsProfile} />
         <div className='Profile__panel'>
            <div className='Profile__header'>
               <p>Aquí va el rol</p>
            </div>
            <form className='Profile__main' onSubmit={handleSubmit}>
               <div>
                  <div className='Profile__img'>
                     <img src={DEFAULT_IMG_USER} alt='Foto de perfil'/>
                     <button type='button'>+</button>
                  </div>
                  <div className='Profile__item'>
                     <p>Nombre: </p>
                     <div>
                        <p>Daniel Esteban Santos Méndez</p>
                        <button type='button' className='Profile__edit'>
                           <img src={iconEdit} alt='icono de editar'/>
                        </button>
                     </div>
                  </div>
                  <div className='Profile__item'>
                     <p>Identificador: </p>
                     <div>
                        <p>1012234678</p>
                        <button type='button' className='Profile__edit'>
                           <img src={iconEdit} alt='icono de editar'/>
                        </button>
                     </div>
                  </div>
                  <div className='Profile__item'>
                     <p>Fecha de nacimiento: </p>
                     <div>
                        <p>1995/04/06</p>
                        <button type='button' className='Profile__edit'>
                           <img src={iconEdit} alt='icono de editar'/>
                        </button>
                     </div>
                  </div>
                  <div className='Profile__item'>
                     <p>Páis: </p>
                     <div>
                        <p>Colombia</p>
                        <button type='button' className='Profile__edit'>
                           <img src={iconEdit} alt='icono de editar'/>
                        </button>
                     </div>
                  </div>
                  <div className='Profile__item'>
                     <p>Ciudad: </p>
                     <div>
                        <p>Santiago de Cali, Valle del Cauca</p>
                        <button type='button' className='Profile__edit'>
                           <img src={iconEdit} alt='icono de editar'/>
                        </button>
                     </div>
                  </div>
                  <div className='Profile__item'>
                     <p>Número de telefono: </p>
                     <div>
                        <p>3168895459</p>
                        <button type='button' className='Profile__edit'>
                           <img src={iconEdit} alt='icono de editar'/>
                        </button>
                     </div>
                  </div>
               </div>



               {/* Seguridad */}
               <div>
                  <div className='Profile__authentication'>
                     <h3>Seguridad:</h3>
                     <div>
                        <p>
                           <span>Por seguridad puedes activar autenticación en 2 pasos:</span>
                        </p>
                        <div>
                           <p>
                              Lo puedes realizar por medio de un código el cual tendrás que digitar al momento de iniciar sesión.
                           </p>
                           <p>
                              <span>Puedes obtener el código de dos formas:</span>
                           </p>
                           <p>
                              <span>1.</span> Usa la aplicación <a href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=es_EC'>Google Authenticator</a> para que escanear el código QR y te dará el código.
                           </p>
                              <div className='Profile__QR'>
                              <p>Escanea el código QR:</p>
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
                           Una vez escaneado el código QR, Google Athenticator lo guardará y lo estará generando cada 30 segundos.
                        </p>
                        <p>
                          Al iniciar sesión podrás elegir el método autenticación, si no has escaneado el código QR lo puedes hacer por correo y si ya lo escaneaste tu eliges el método.
                        </p>
                        <label className='check'>Activar Autenticación
                           <input
                              type='checkbox'
                              name='isActive'
                              value={form.isActive}
                              onChange={handleChangeInput}
                              checked={form.isActive ? true : false}
                              />
                           <span className='checkmark' />
                        </label>
                     </div>
                     {/* {
                        form.isActive &&
                        <div className='Profile__QR'>
                           <p>Escanea el código QR:</p>
                           <div>
                              <img src={qr} alt='Código QR'/>
                           </div>
                        </div>
                     } */}
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
      </>
   )
}

Profile.propTypes = {
   handleChangeInput: PropTypes.func.isRequired,
   handleSubmit: PropTypes.func.isRequired,
   form: PropTypes.object.isRequired,
   qr: PropTypes.string,
   loader: PropTypes.bool,
   saved: PropTypes.bool,
   notSaved: PropTypes.bool,

}

export default Profile;