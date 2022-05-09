
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getDogByID, isLoading, removeSelectedDog } from '../../redux/actions/actions'
import mainImg from '../../assets/Perrito1.png'
import style from './dogDetail.module.css'

export const DogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { name, weight, height, life_span, temperament, image } = useSelector(state => state.selectedDog)
  const { isLoading: isLoadingState } = useSelector(state => state)
  
  useEffect(() => {
    dispatch(isLoading())
    
  }, [dispatch])
  
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
      {(isLoadingState) ? 'Loading...' :
      
        <img src={ image ? image : mainImg} alt={ name } className={style.image}/>
      } 
        <h1>{name}</h1>
        <span className='item'>Wight: { weight } kg</span><br />
        <span>Height: { height } cm</span><br />
        {life_span && <><span>Life span: { life_span }</span><br /></>}
        {temperament && <><span>Temperament: {temperament}</span><br /></>}
        
        <Link to='/dogs'>Back</Link><br />
      </div>
    </div>
    
  )
}

