
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getDogByID, removeSelectedDog } from '../redux/actions/actions'

export const DogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const apiURL = process.env.REACT_APP_API_IMG_URL;
  
  const { name, weight, height, life_span, temperament, reference_image_id } = useSelector(state => state.selectedDog)
    


  useEffect(() => {
    dispatch(getDogByID(id))
  
    return () => {
      //limpiar el store cuando se desmonte
      dispatch(removeSelectedDog())
    }
  }, [dispatch, id])
  

  return (
    <div>
      <h1>{name}</h1>
      <span>{weight}</span>
      <span>{height}</span>
      <span>{life_span}</span>
      <span>{temperament}</span>
      <span>{`${apiURL}${reference_image_id}`}</span>
      <NavLink to='/dogs'>Back</NavLink>
    </div>
  )
}
