import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeOrder, changePage, clearFilters, getDogs, isLoading } from '../redux/actions/actions';
import { DogCard } from './DogCard'
import style from './dogs.module.css'
import { DogSearchByName } from './DogSearchByName';
import { DogSearchByTemperament } from './DogSearchByTemperament';
export const Dogs = () => {

  const dispatch = useDispatch();
  const { page, isLoading: isLoadingState, dogs, searchBy } = useSelector(state => state)

  
  const [cantPages, setCantPages] = useState(1)
  const [source, setSource] = useState('')  
  
  useEffect(() => {
    dispatch(isLoading())
    
  }, [dispatch])

  useEffect(() => {
   if(!searchBy) {dispatch(getDogs(source))}

  }, [dispatch, searchBy, source])
  
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
const handleClear = () => {
  dispatch(clearFilters())
}

const handleSource = ({target}) => {
  // console.log(target.value)
  setSource(target.value)
  dispatch(clearFilters())
}
  return (
    <>
        
        <div className={style.containerFilters}>
          <div className={style.filters}>
              <span>Source: 
                <select name='source1' onChange={handleSource}>
                  <option value=''>All</option>
                  <option value='db'>User created</option>
                  <option value='api'>Api</option>
                </select>
              </span>
              <DogSearchByName />
              <DogSearchByTemperament/>
              <button className='search' onClick={ handleClear }>Clear filters</button>
          </div>
          <div className={style.orders}>
            <div
              >Order by: <span>Name:</span> <span className={style.arrow} onClick={() => handleOrder('name', 'DESC')}>⇩</span>
                                            <span className={style.arrow} onClick={() => handleOrder('name', 'ASC')}>⇧</span>
                         <span>Weight:</span> <span className={style.arrow} onClick={() => handleOrder('weightMin', 'DESC')}>⇩</span>
                                              <span className={style.arrow} onClick={() => handleOrder('weightMin', 'ASC')}>⇧</span>
            </div>
            <div><span>Page { page } of { cantPages }</span> <br/><span  className={style.arrow} onClick={ handlePrevious } >◁ </span><span  className={style.arrow} onClick={ handleNext }> ▷</span></div>
          </div>
        </div>
        <div className={ style.container }>
        {(isLoadingState) && 'Loading...'}
        {(dogs.length === 0 && !isLoadingState) && 'There are no dogs with the chosen characteristics'}
          {
            dogs?.map((d, i) => {
              if (i < page*8 && i>=(page-1)*8) {
          
                return <DogCard key={ d.id }
                          id =  { d.id }
                          name = { d.name }
                          weight = { d.weight }
                          temperament = { d.temperament }
                          image = { d.image?.url ? d.image?.url : d.image }
                       />
              } else return null
            })
          }
          
        </div> 
        
    </>
  )
}
