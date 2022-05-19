
import { Link } from 'react-router-dom'
import style from './dogCard.module.css'
import mainImg from '../../assets/Perrito.png'

export const DogCard = ({id, name, weight, height, temperament, image}) => {
  
  return (
    <div className={style.container}>
      <div className={style.imageContainer}><img src={ image ? image : mainImg } alt={ name } className={style.image}/></div>
      <div className={style.data}>
        <h3>{ name }</h3>
        <span>Weight: { weight==="NaN" ? 'No info' : `${weight} kg`}</span>
        <span>Height: { height==="NaN" ? 'No info' : `${height} cm`}</span>
        <span>{ temperament }</span>
        <span><Link to={`/dogs/detail/${id}`}>Details</Link></span>
      </div>
    </div>
  )
}
