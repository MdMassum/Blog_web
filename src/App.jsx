import './App.css'
import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './features/authSlice'
import { Footer, Spinner } from './components'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(()=>{

    authService.getCurrentUser()
    .then((userData) =>{
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false)) // finally() always gets executed

  },[])
  return loading ? <Spinner/> : (
    <>
      <h1>A React Based Blog Web</h1>
      <Footer/>
    </>
  )
}

export default App
