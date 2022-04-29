import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import style from './dogCard.module.css'
// import mainImg from '../assets/Perrito.png'
import mainImg from '../assets/dogHome.jpeg'

export const DogCard = ({id, name, weight, temperament, image}) => {
  const imgPNG = useSelector(state => state.imgPNG)
  const imageRef = useRef(image)
    
    useEffect(() => {
      if(imgPNG.includes(id)) imageRef.current = image.replace('.jpg','.png')
    }, [id,image,imgPNG])
    
    
  return (
    <div className={style.container}>
      <img src={ image ? imageRef.current : mainImg } alt={ name } className={style.image}/>
      <h1>{ name }</h1>
      <span>Weight: { weight }</span>
      <span>{ temperament }</span>
      <span><Link to={`/dogs/detail/${id}`}>Ver</Link> </span>
    </div>
  )
}
