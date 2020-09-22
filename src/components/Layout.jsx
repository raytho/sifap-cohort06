/* eslint-disable react/prop-types */
import React from 'react';

import '../assets/styles/components/Content.scss';
import '../assets/styles/components/Main.scss';

import Header from './Header';
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