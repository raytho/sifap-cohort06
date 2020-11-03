import { useEffect, useState } from 'react';

const useMediaQuery = () => {
   const [changeSize, setChangeSize] = useState(true);
   useEffect(() => {
      const media = window.matchMedia('(min-width: 1023px)');
      setChangeSize(media.matches);
      const queryEvent = () => {
         if(media.matches) {
            setChangeSize(media.matches)
         } else {
            setChangeSize(media.matches)
         }
      }
      media.addEventListener('change', queryEvent);

      return () => media.removeEventListener('change', queryEvent);
   }, [])

   return changeSize;
}

export default useMediaQuery;

