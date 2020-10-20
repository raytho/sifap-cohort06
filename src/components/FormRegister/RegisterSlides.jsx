import React from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';

import '../../assets/styles/components/Register/RegisterSlides.scss';

const RegisterSlides = () => {

   const slideView = useMediaQuery();

   return (
      slideView
      ?
      <div className='SignUp__slide'>
         <h2>SIFAP <span> - Sistema de facturación para personas físicas con actividadempresarial.</span></h2>
         <ul>
            <li>
               <img src='https://i.imgur.com/uBrN4k7.png' alt='Slide' />
            </li>
            <li>
               <img src='https://i.imgur.com/08pBFtj.png' alt='Slide' />
            </li>
            <li>
               <img src='https://i.imgur.com/pZre8a8.png' alt='Slide' />
            </li>
         </ul>

         <div>
            <span> </span>
            <span> </span>
            <span> </span>
         </div>
         <div>
            <span className='fill'> </span>
         </div>
      </div>
      : null
   )
}

export default RegisterSlides;