import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import mainImg from '../assets/Perros.png'
import {  getTemperaments } from '../redux/actions/actions'
export const Home = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTemperaments())
  
  }, [dispatch])
  

  return (
    <>
    
    <div className='home'>
      <center>
        Welcome to the Dogs breads site
        <br/><img src={mainImg} alt='Welcome' width={500}/><br/>
        <Link to='/dogs'>
            [ingresar]
        </Link>
      </center>
    </div>

    </>
  )
}
