import React from 'react'

const getError = (error) => {
  return  error.message && error.response.data.message ?
    error.response.data.message: error.message;
  
}

export default getError