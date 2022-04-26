import React from 'react'
import { Link } from 'react-router-dom'
import mainImg from '../assets/Perrito.png'
export const Home = () => {
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
