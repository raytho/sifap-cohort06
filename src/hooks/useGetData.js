import { useEffect, useState } from 'react';

const useGetData = async () => {

   const [data, setData] = useState([]);

   useEffect(() => {
      const getData = async (API) => {

         try {
            const response = await fetch(API);
            const result = await response.json();
            setData(result);
         } catch (error) {
            window.console.log(error.message);
         }
      };
      getData()

   }, []);

   return data;
}

export default useGetData;