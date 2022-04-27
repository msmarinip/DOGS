import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeOrder, changePage, getDogs, isLoading } from '../redux/actions/actions';
import { DogCard } from './DogCard'
import style from './dogs.module.css'
export const Dogs = () => {

  const dispatch = useDispatch();

  // const isLoadingState = useSelector(state => state.isLoading)
  // const dogs = useSelector(state => state.dogs);
  const { page, isLoadingState, dogs } = useSelector(state => state)

  
  const [cantPages, setCantPages] = useState(1)
  
  
  useEffect(() => {
    dispatch(isLoading())
    
  }, [dispatch])

  useEffect(() => {
    dispatch(getDogs())
    
  }, [dispatch])
  
useEffect(() => {
  setCantPages(Math.ceil(dogs.length/8))
}, [dogs.length])

const handleNext = () => {
  
  page<cantPages && dispatch(changePage(page+1))
  //TODO: Deshabilitar con CSS NEXT cuando se llegó a la pag final
  
}
const handlePrevious = () => {
  page>1 &&  dispatch(changePage(page-1))
  //TODO: Deshabilitar con CSS PREVIOUS cuando se llegó a la pag final
  
}

const handleOrder = (by, direction) => {

  dispatch(changeOrder(by, direction))
}
  return (
    <>
        {(isLoadingState) && 'Loading...'}
        <div>Dogs</div>
        <div>Page { page } of { cantPages } <button onClick={ handlePrevious }>◄ &#8592;</button><button onClick={ handleNext }>&#8594; ►</button></div>

        <div>Order by: Name <button onClick={() => handleOrder('name', 'DESC')}>DESC</button><button onClick={() => handleOrder('name', 'ASC')}>ASC</button></div>
        <div>Order by: Weight <button onClick={() => handleOrder('weightMin', 'DESC')}>DESC</button><button onClick={() => handleOrder('weightMin', 'ASC')}>ASC</button></div>
        <div className={ style.container }>
          {
            dogs?.map((d, i) => {
              if (i < page*8 && i>=(page-1)*8) {
          
                return <DogCard key={ d.id }
                          id =  { d.id }
                          name = { d.name }
                          weight = { d.weight }
                          temperament = { d.temperament }
                          image = { d.image?.url }
                       />
              } else return null
            })
          }
          
        </div> 
        
    </>
  )
}
