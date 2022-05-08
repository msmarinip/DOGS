import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogByTemperament, getDBTemperaments } from '../../redux/actions/actions';
import style from './DogSearchByTemperament.module.css'
export const DogSearchByTemperament = () => {
    const dispatch = useDispatch();
    const {temperaments, source, searchTempValues } = useSelector(state => state)
    const [errors, setErrors] = useState('')
    const [addTemp, setAddTemp] = useState(searchTempValues);
    useEffect(() => {
        dispatch(getDBTemperaments())
        
        return () => {
            setAddTemp([])
        }
        
    }, [dispatch])


    useEffect(() => {
      
        setAddTemp(searchTempValues)
      
    }, [searchTempValues])
    

    const handleAdd = ({target})  => {
        
        if(!addTemp?.includes(target.value) && target.value!==''){  
            setErrors('')
            setAddTemp([...addTemp, target.value])
        };

    }
   
    const handleRemove = (index) => {
        setAddTemp(addTemp.filter((t, i) => i !==index))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(addTemp.length<1) setErrors('Please, add at least one temperament.')
        else dispatch(getDogByTemperament(addTemp, source))

        document.f1.temperament.value='';
        
    }
  return (
    
        <form name='f1' onSubmit={handleSubmit}>
            <label>Temperament</label>
            <select name='temperament' onChange={handleAdd}>
                <option value=''>Choose a temperament</option>
                {
                    temperaments?.map(t => <option value={t.temperament} key={t.id}>{t.temperament}</option>)
                }
            </select>

            <button type='submit' value='Search'  className='search'>Search</button>{errors && <><br/><span>{ errors }</span></>}<br/>
            <span>{
                    addTemp?.map((temp,i) =>
                        <span  key={temp}>
                            <b>{temp} </b> 
                            <span onClick={ () => handleRemove(i) } className={style.click}> ✗ </span>
                        </span>)
                }
            </span>
        </form>
    
  )
}
