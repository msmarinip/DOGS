// import { useSelector } from 'react-redux'
// import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import style from './dogCard.module.css'
import mainImg from '../../assets/Perrito.png'
// import mainImg from '../assets/dogHome.jpeg'

export const DogCard = ({id, name, weight, temperament, image}) => {
  
  return (
    <div className={style.container}>
      <div className={style.imageContainer}><img src={ image ? image : mainImg } alt={ name } className={style.image}/></div>
      <div className={style.data}>
        <h3>{ name }</h3>
        <span>Weight: { weight } kg</span>
        <span>{ temperament }</span>
        <span><Link to={`/dogs/detail/${id}`}>Ver</Link> </span>
      </div>
    </div>
  )
}
