import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {  getTemperaments } from '../../redux/actions/actions'
import style from './home.module.css'
import mainImg from '../../assets/Perrito.png'
// import mainImg from '../../assets/bestFriend.jpeg'
// import mainImg from '../../assets/Perros.png'
export const Home = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTemperaments())
  
  }, [dispatch])
  

  return (
    <div className={style.container}>
    
    <div className={style.content}>
      
        <div className={style.title}>Meet your next best friend!</div>
        <div className={style.image}><span><img src={mainImg} alt='Welcome' width={500}/></span></div>
        <div className={style.enter}>
          <NavLink to='/dogs' className={isActive =>(!isActive ? style.unselected : style.navlink)}>
              Enter
          </NavLink>
        </div>
      
    </div>

    </div>
  )
}
