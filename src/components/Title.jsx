/* eslint-disable react/prop-types */
import React from 'react';

import '../assets/styles/components/Title.scss';

const Title = ({ title, icon, alt }) => (
   <div className='Title'>
      <img src={icon} alt={alt} />
      <h2>{title}</h2>
   </div>
);

export default Title;