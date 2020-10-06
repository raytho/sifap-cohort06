import React from 'react';

import '../../assets/styles/components/Register/RegisterSlides.scss';

import Business from '../../assets/static/images/Business.png';
import Options from '../../assets/static/images/Options.png';
import SetupWizard from '../../assets/static/images/SetupWizard.png';

const LoginSlides = () => {
   return (
      <div className='SignUp__slide'>
         <ul>
            <li>
               <img src={Business} alt='Slide' />
            </li>
            <li>
               <img src={Options} alt='Slide' />
            </li>
            <li>
               <img src={SetupWizard} alt='Slide' />
            </li>
         </ul>
      </div>
   )
}

export default LoginSlides;