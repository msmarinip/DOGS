import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orderBy } from '../../helpers/orderBy';
import { changeOrder, changePage, changeSource, clearFilters, getDogs, isLoading } from '../../redux/actions/actions';
import { DogCard } from '../card/DogCard'
import style from './dogs.module.css'
import { DogSearchByName } from './DogSearchByName';
import { DogSearchByTemperament } from './DogSearchByTemperament';
export const Dogs = () => {

  const dispatch = useDispatch();
  const { page, isLoading: isLoadingState, dogs, searchBy, source, searchTempValues, searchName } = useSelector(state => state)

  
  const [cantPages, setCantPages] = useState(1)
  
  useEffect(() => {
    if(!searchBy){ dispatch(isLoading())}
    
  }, [dispatch, searchBy])

  useEffect(() => {
     if(!searchBy) {dispatch(getDogs(source))}
  }, [dispatch, searchBy, source])
  
  useEffect(() => {
    setCantPages(Math.ceil(dogs.length/8))
  }, [dogs.length])

  const handleNext = () => {
    
    page<cantPages && dispatch(changePage(page+1))
    
  }
  const handlePrevious = () => {
    page>1 &&  dispatch(changePage(page-1))
    
    
  }

  const handleOrder = (by, direction) => {

    dispatch(changeOrder(by, direction))
  }
  const handleClear = () => {
    dispatch(clearFilters())
  }

  const handleSource = ({target}) => {
    
    dispatch(changeSource(target.value))
  }


  return (
    <>
        
        <div className={style.containerFilters}>
          <div className={style.filters}>
              <span>Source: 
                <select 
                  name='source' 
                  onChange={handleSource}
                  defaultValue={ source ? source : '' }
                
                >
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
              >Order by: 
                        {orderBy('Name', 'name', 'name', style, handleOrder)}
                        {orderBy('Weight', 'weightMin','weightMin', style, handleOrder)}
                        {orderBy('Height', 'heightMin','heightMin', style, handleOrder)}
                        
            </div>
            
            {cantPages>0 && <div><span>Page { page } of { cantPages }</span> <br/><span  className={style.arrow} onClick={ handlePrevious } >◁ </span><span  className={style.arrow} onClick={ handleNext }> ▷</span></div>}
          </div>
        </div>
        
        <div className={style.errors}>
        {(isLoadingState) && <>Loading...<br/><br/></>}
        
        {(dogs.length === 0 && !isLoadingState) && 'There are no dogs with the chosen characteristics'}
          {searchBy
            ? searchName ? <div>Searched by name: {searchName}</div>
                         : <div>Searched by temperament: {searchTempValues.map(t => ` ${t} -  `)}</div>
            : null
            }
        </div>
        <div className={ style.container }>
       
          {
            dogs?.map((d, i) => {
              if (i < page*8 && i>=(page-1)*8) {
          
                return <DogCard key={ d.id }
                          id =  { d.id }
                          name = { d.name }
                          weight = { d.weight }
                          height = { d.height }
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
