
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getDogByID, removeSelectedDog } from '../redux/actions/actions'
import mainImg from '../assets/Perrito.png'
import style from './dogDetail.module.css'

export const DogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  
  const { name, weight, height, life_span, temperament, image } = useSelector(state => state.selectedDog)
  // let history = useHistory();
  

  useEffect(() => {
    dispatch(getDogByID(id))
  
    return () => {
      //limpiar el store cuando se desmonte
      dispatch(removeSelectedDog())
    }
  }, [dispatch, id])


  return (
    <div className={style.container}>
      <div className={style.containerPoem}>
      <div className={style.poem}>
        
      </div>
      </div>
      <div className={style.containerData}>
      <img src={ image ? image.url : mainImg} alt={ name } className={style.image}/>
        <h1>{name}</h1>
        <span className='item'>Wight: { weight } kg</span><br />
        <span>Height: { height } cm</span><br />
        <span>Life span: { life_span }</span><br />
        <span>Temperament: {temperament}</span><br />
        
        <NavLink to='/dogs'>Back</NavLink><br />
      </div>
    </div>
    
  )
}

