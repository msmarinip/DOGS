import React from 'react'
import { NavLink } from 'react-router-dom'
import { DogSearchByName } from './DogSearchByName'
import { DogSearchByTemperament } from './DogSearchByTemperament'
import style from './NavBar.module.css'
export const NavBar = () => {
  

  return (
    <div className={style.container}>
      <DogSearchByName />
      <DogSearchByTemperament/>
      <NavLink to='/dogs/create'>New Dog</NavLink>

    </div>
  )
}
