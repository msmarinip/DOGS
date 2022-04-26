import style from './dogCard.module.css'
import { Link } from 'react-router-dom'
// import mainImg from '../assets/Perrito.png'
import mainImg from '../assets/dogHome.jpeg'
export const DogCard = ({id, name, weight, temperament, image}) => {


  return (
    <div className={style.container}>
      <img src={ image ? image : mainImg } alt={ name } className={style.image}/>
      <h1>{ name }</h1>
      <span>Weight: { weight }</span>
      <span>{ temperament }</span>
      <span><Link to={`/dogs/detail/${id}`}>Ver</Link> </span>
    </div>
  )
}
