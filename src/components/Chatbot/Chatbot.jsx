import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import '../../assets/styles/components/Chatbot/Chatbot.scss';

const Chatbot = () => {
   // const [openBot, setOpenBot] = useState(false);
   const [openMessage, setOpenMessage] = useState(false);
   let idSetTimeOut;
   const handleMessage = () => {
      if(openMessage) {
         setOpenMessage(false);
      } else {
         setOpenMessage(true);
      }
   }
   useEffect(() => {
      idSetTimeOut = setTimeout(() => handleMessage(), 2000);
      return () => clearTimeout(idSetTimeOut)
   }, [])
   // const handleChatbot = () => {
   //    if(openBot) {
   //       setOpenBot(false);
   //    } else {
   //       setOpenBot(true);
   //       setOpenMessage(false)
   //       clearTimeout(idSetTimeOut)
   //    }
   // }
   // const buttonIfrem = document.getElementsByTagName('iframe');
   // window.onload = () => window.console.log(buttonIfrem[0]?.contentWindow.getElementsByTagName('button'),'iframe');
   return  (
      ReactDOM.createPortal(
         <>
            {
               openMessage
                  ? <div className='Chatbot__message'>
                     <button type='button' onClick={handleMessage}>X</button>
                     <p>
                        <span role='img' aria-label='Hola'>👋🏽👋🏽</span>
                        ¡Hola! Soy Vinzea 👩🏽‍💼 y estoy aquí para resolver tus dudas.
                        ¡Escríbeme!
                     </p>
                  </div>
                  : null
            }
            {/* <button
               className='Chatbot__open'
               type='button' onClick={handleChatbot}
            >
               <img  src='https://i.imgur.com/FjzAcjI.png' alt='Logo'/>
               <p>Vinzea</p>
            </button> */}
            {/* {
               openBot
                  ? <div className='Chatbot__container'>
                     <button className='Chatbot__close' type='button' onClick={handleChatbot}>X</button>
                     <iframe
                     className='Chatbot__chat'
                     title='Chatbot'
                     src='https://webchat.snatchbot.me/38f3a464d75e2dc56ad85845275d6345c5a505572b114b39096a943ba3bcdb2f'
                     />
                  </div>
               : null
            } */}
         </>
         ,
         document.getElementById('chatbot')
      )
   );
};

export default Chatbot;