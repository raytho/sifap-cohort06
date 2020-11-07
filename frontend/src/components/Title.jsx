/* eslint-disable react/prop-types */
import React from 'react';

import '../assets/styles/layout/Title.scss';

const Title = ({icon, title }) => (
   <div className='Title'>
      <img src={icon} alt='Imagen de perfil' />
      <h2>{title}</h2>
   </div>
);

export default Title;