import React, { useState,useEffect } from 'react'

export function useFetch(url) {

    const [data, setData] = useState([])
    const [error,setError] = useState(null)

    useEffect(() => {

      const fetchapi = async() => {

        try {

          const response = await fetch(url);
          const res = await response.json();
          setData(res)
          
        } catch (error) {
          setError(error)
        }

      }

      fetchapi();
        
    }, [url])

  return {data, error};
  
}

