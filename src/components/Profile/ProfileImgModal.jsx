/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../Context';

import Modal from '../Modal';
import '../../assets/styles/components/Profile/ProfileImgModal.scss';

const ProfileImg = (props) => {

   const {
      handleSubmitImg,
      handleClickAdd,
      handleInputImg,
      user,
      addImage,
      iconSaveDos,
      loaderImg,
      inputFile,
      uploadedImg,
   } = props;
   const { userImg } = useContext(Context);
   return (
      <Modal
         isOpen={addImage}
         handleModalClose={handleClickAdd}
      >
         <div className='Profile'>
            <button type='button' onClick={handleClickAdd}>X</button>
            <form onSubmit={handleSubmitImg}>
               <div className='Profile__modal-img'>
                  <img
                     src={userImg === undefined ? user.profile_picture_url : userImg}
                     alt='Foto de perfil'
                  />
                  {loaderImg && <p>Cargando...</p>}
                     <div>
                        <input
                           className='Profile__input-img'
                           type='file'
                           formEncType='multipart/form-data'
                           accept='image/png, .jpeg, .jpg'
                           ref={inputFile}
                           onChange={handleInputImg}
                        />
                        <button type='submit'>
                           <img src={iconSaveDos} alt='icono de editar'/>
                        </button>
                     </div>
                     {uploadedImg && <p>Se actualizo la imagen correctamente.</p>}
                     {uploadedImg === false && <p>Error al subir la imagen, intenta de nuevo.</p>}
               </div>
            </form>
            <button type='button' onClick={handleClickAdd}>Aceptar</button>
         </div>
      </Modal>
   );
}

ProfileImg.propTypes = {
   handleSubmitImg: PropTypes.func.isRequired,
   handleClickAdd: PropTypes.func.isRequired,
   handleInputImg: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired,
   addImage: PropTypes.bool.isRequired,
   iconSaveDos: PropTypes.string.isRequired,
   loaderImg: PropTypes.bool.isRequired,
   inputFile: PropTypes.object.isRequired,
   uploadedImg: PropTypes.bool,
}

export default ProfileImg;