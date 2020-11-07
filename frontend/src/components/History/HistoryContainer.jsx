import React, { useState, useEffect } from 'react';

import History from './History';

const HistoryContainer = () => {

   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const controller = new AbortController();
   const token = window.sessionStorage.getItem('token');
   const [loader, setLoader] = useState(true);
   const [history, setHistory] = useState([]);
   const [noBill, setNoBill] = useState(false)


   useEffect(() => {
      const getDataHsitoryBill = async () => {
         const response = await fetch(`${API}user/invoice-history`, {
            method: 'GET',
            signal: controller.signal,
            headers: {
               'Authorization': `Bearer ${token}`
            }
         });
         const { message, invoices} = await response.json();
         if(message === 'Ok') {
            window.console.log(invoices);
            setHistory(invoices);
            setLoader(false);
         } else if(message === 'El usuario no ha emitido facturas') {
            setNoBill(true);
            setLoader(false);
         }
      }
      getDataHsitoryBill()

      return () => controller.abort();
   }, [])

   return (
      <History
         loader={loader}
         history={history}
         noBill={noBill}
      />
   );
}

export default HistoryContainer;