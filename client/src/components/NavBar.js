import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './NavBar.module.css'
import mainImg from '../assets/Perrito.png'
export const NavBar = () => {
  

  return (
    <div className={style.container}>
      <div className={style.navMenu}>
        <NavLink to='/dogs' className={style.navLink}>Main page</NavLink>
        <NavLink to='/dogs/create'  className={style.navLink}>New Dog</NavLink>
      </div>
      <div className={style.navTitle}>Dogs</div>
      <div className={style.img}><img src={mainImg} alt='Welcome' width={50}/></div>
      {/* <NavLink to='/dogs/create'  className={isActive => style.navLink + (!isActive ? style.unselected : "")}>New Dog</NavLink> */}
      
    </div>
  )
}
