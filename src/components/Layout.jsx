/* eslint-disable react/prop-types */
import React from 'react';

import '../assets/styles/layout/Content.scss';
import '../assets/styles/layout/Main.scss';

import Header from './Header/Header';
import Navbar from './Navbar';

const Layout = (props) => {

   const { children } = props;

   return (
      <>
         <Header />
         <div className='Content'>
            <Navbar />
            <main className='Main'>
               {children}
            </main>
         </div>
      </>
   );
}
export default Layout;