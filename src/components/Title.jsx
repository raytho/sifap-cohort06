/* eslint-disable react/prop-types */
import React from 'react';

import '../assets/styles/layout/Title.scss';

const Title = ({icon }) => (
   <div className='Title'>
      <img src={icon} alt='Imagen de perfil' />
      <h2>Perfil</h2>
   </div>
);

export default Title;