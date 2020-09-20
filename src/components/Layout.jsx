/* eslint-disable react/prop-types */
import React from 'react';

import '../assets/styles/components/Content.scss';
import '../assets/styles/components/Main.scss';

import Header from './Header';
import Navbar from './Navbar';

const Layout = (props) => {

   const { children, icon, title, alt  } = props;

   return (
      <>
         <Header />
         <div className='Content'>
               <Navbar />
            <main className='Main'>
               <div className='Main__title'>
                  <img src={icon} alt={alt} />
                  <h2>{title}</h2>
               </div>
               {children}
            </main>
         </div>
      </>
   );
}
export default Layout;