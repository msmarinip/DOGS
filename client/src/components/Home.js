import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import mainImg from '../assets/Perrito.png'
import {  getTemperaments } from '../redux/actions/actions'
export const Home = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTemperaments())
  
  }, [dispatch])
  

  return (
    <>
    
    <div>
      <center>
        <img src={mainImg} alt='Welcome' width={500}/>
        <Link to='/dogs'>
            [ingresar]
        </Link>
      </center>
    </div>

    </>
  )
}
