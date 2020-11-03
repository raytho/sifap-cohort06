/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const GetData = ({ api, children, change, token }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const controller = new AbortController()
  useEffect(() => {
    const getData = async () => {
      try {
         const response = await fetch(api, {
            method: 'GET',
            headers: {
               'Authorization': `Bearer ${token}`
            },
            signal: controller.signal
         })
         const result = await response.json();
         setData(result);
         setLoading(false);
      } catch (errorCatch) {
         window.console.log(errorCatch.message)
         setError(errorCatch)
      }
    }
    getData()

    return () => controller.abort();

  }, [change])
  return(
     <>
         {children({loading, error, data})}
     </>
  )
}

GetData.propTypes = {
   api: PropTypes.string.isRequired,
}

export default GetData;
