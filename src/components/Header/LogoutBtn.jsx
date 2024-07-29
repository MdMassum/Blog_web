import React from 'react'
import authService from '../../appwrite/auth'
import { logout } from '../../features/authSlice'
import { useDispatch } from 'react-redux'

function LogoutBtn() {

    const dispatch = useDispatch();
    const clickHandler=()=>{
        authService.logout().then(()=>   // first backend logout is called and then frontend logout is call using dispath to update the store
    dispatch(logout()));   
    }
  return (
    <button onClick={clickHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default LogoutBtn