import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogByTemperament, getDBTemperaments } from '../redux/actions/actions';

export const DogSearchByTemperament = () => {
    const [errors, setErrors] = useState('')
    const [addTemp, setAddTemp] = useState([]);
    const [addTemporal, setAddTemporal] = useState([]);
    const [currentValue, setCurrentValue] = useState('');
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments)
    
    useEffect(() => {
        dispatch(getDBTemperaments())
        
        return () => {
            setAddTemp([])
        }
        
    }, [dispatch])
    const handleAdd = ()  => {
        if(!addTemp.includes(currentValue) && currentValue!==''){  
            setErrors('')
            setAddTemp([...addTemp, currentValue])
            setAddTemporal([...addTemporal, currentValue])
            
            //TODO: avisar al usuario que el temp ya está en el array de búsqueda
            //Y que debe seleccionar alguno antes de hacer add
        };

    }
    
    const handleCurrentValue = (e) => {
        e.preventDefault();
        const current = e.currentTarget.value;
        setCurrentValue(current)
        
    }

    const handleRemove = (index) => {
        setAddTemporal(addTemporal.splice(index,1))
        setAddTemp(addTemporal)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(addTemp)
        if(addTemp.length<1) setErrors('Please, select at least one temperament.')
        else dispatch(getDogByTemperament(addTemp))
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Temperament</label>
            <select name='temperament' onChange={handleCurrentValue}>
                <option value=''>Choose a temperament</option>
                {
                    temperaments?.map(t => <option value={t.temperament} key={t.id}>{t.temperament}</option>)
                }
            </select>
            <button type='button' name='add' onClick={() => handleAdd() }>add</button>
            {
                //TODO: onmouseover tengo que poner la manito para que el usuario sepa que puede hacer click
                
            }
            <button type='submit' value='Search'>Search</button>{errors && <><br/><span>{ errors }</span></>}<br/>
            <span>{
                    addTemp?.map((temp,i) =>
                        <span  key={temp}>
                            <b>{temp} </b> 
                            <span onClick={ () => handleRemove(i) }> X </span>
                        </span>)
                }
            </span>
        </form>
    </div>
  )
}
