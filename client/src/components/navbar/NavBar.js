import React from 'react'
import { Link } from 'react-router-dom'
import style from './NavBar.module.css'
import mainImg from '../../assets/Perrito.png'
export const NavBar = () => {
  

  return (
    <div className={style.container}>
      <div className={style.navMenu}>
        <Link to='/dogs' className={style.navLink}>Main page</Link>
        <Link to='/dogs/create'  className={style.navLink}>New Dog</Link>
      </div>
      <div className={style.navTitle}>Dogs</div>
      <div className={style.img}><img src={mainImg} alt='Welcome' width={50}/></div>
      
      
    </div>
  )
}
