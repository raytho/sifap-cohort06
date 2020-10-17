/* eslint-disable react/require-default-props */
import React from 'react'

import PropTypes from 'prop-types'
import classNames from 'classnames';

import '../assets/styles/layout/AsideLogo.scss';



const AsideLogo = ({ NavLogo, SignUpLogo }) => {
   const asideLogoClass = classNames('', {
      NavLogo,
      SignUpLogo,
   })

   return (
   <div className={`Aside__logo ${asideLogoClass}`}>
      <div>
         <h1>
            <img src='https://i.imgur.com/FjzAcjI.png' alt='Logo Sifap' />
         </h1>
      </div>
   </div>
   )
}

AsideLogo.propTypes ={
   NavLogo: PropTypes.bool,
   SignUpLogo: PropTypes.bool,
}

export default AsideLogo;