import React from 'react'
import LoaderGIF from '../images/loader.gif'

export const Loader = () => {
  return (
    <div className='loader-container'>
      <img src={LoaderGIF} autoPlay loop muted />
      <div>Please refresh the page</div>
    </div>
  )
}

