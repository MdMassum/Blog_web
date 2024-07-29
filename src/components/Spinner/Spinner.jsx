import loading from './Iphone-spinner-2.gif'
import React from 'react'

export default function Spinner() {
  return (
    <div className='text-center my-3'>
        <img src={loading} alt="" />
      </div>
  )
}