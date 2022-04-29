import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getDBTemperaments } from '../redux/actions/actions';
import { inputText } from '../helpers/inputText'
import { validateForm } from '../helpers/validateForm'
import { selectTemperament } from '../helpers/selectTemperament'; 
import { NavLink } from 'react-router-dom';
export const DogCreate = () => {
  const [errors, setErrors] = useState({    
    name:'Required',
    weightMin:'Required',
    weightMax:'Required',
    heightMin:'Required',
    heightMax:'Required',
    life_spanMin:'',
    life_spanMax: '',
    addTemp:'',
    final: ''
  })
  const [values, setValues] = useState({
    name: '',
    weightMin: '',
    weightMax: '',
    heightMin:'',
    heightMax:'',
    life_spanMin:'',
    life_spanMax: '',
    temp:[],
    addTemp: '',
    newTemps: []

  })
  
  const [tempAdded, setTempAdded] = useState({})
  const dispatch = useDispatch();
  const temperaments = useSelector(state => state.temperaments)
    useEffect(() => {
      dispatch(getDBTemperaments())
      return () => {
        
      }
      
  }, [dispatch])
    const handleAdd = ({target})  => {
      // console.log(target.value)
        if(!values.temp.includes(target.value)){  
            setValues({
              ...values,
              temp: [...values.temp, target.value]
            })
            // console.log(values.temperaments)
        } else {
          setValues({
            ...values,
            temp: values.temp.filter(t => t !== target.value)
          })
        }

    }

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name] : target.value
    })
    const err = validateForm(values, errors, {[target.name]: target.value})
    setErrors({
      ...errors,
      final: '',
      [target.name] : err[target.name]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateForm(values,errors,'')
    setErrors({
      ...errors,
      final: err.final
    })
    // console.log(addTemp)
    console.log(values)
    if(!errors.final) addDog(values)
  }

  const handleAddNewTemperament = () => {
    const existsTemp = temperaments.find(t => t.temperament.toLowerCase().trim() === values.addTemp.toLowerCase().trim())
    if(!existsTemp && !values.newTemps.includes(values.addTemp)){
    setValues({
      ...values,
      newTemps: [...values.newTemps, values.addTemp]
    })}
    else {
      setErrors({
        ...errors,
        addTemp: existsTemp? `The temperament ${values.addTemp} is in the list. Please, check it there.`
                : `${values.addTemp} is already added. You can't add twice the same temperament.`
      })
    }
  }
  const handleRemoveNewTemperament = (deleteValue) => {
    setValues({
      ...values,
      newTemps: values.newTemps.filter(t => t!==deleteValue)
    })
  }

  const addDog = async (dogToAdd) => {
    
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}dogs`, dogToAdd)
        console.log(response.data.dataValues)
        setTempAdded({msg: 'ok', uuid: response.data.dataValues.uuid})
        
    } catch (error) {
        console.log(error)
        setTempAdded({msg: 'err'})
    }
}


  return (
    <div>
      {(tempAdded?.msg ==='ok') && (<span>The dog has been added, click <NavLink to={`/dogs/detail/${tempAdded.uuid}`}>here</NavLink>  to see it</span>)
       (tempAdded?.msg ==='err') &&  (<span>There was an error. Please try again later.</span>)
      }
      <form onSubmit={ handleSubmit } name='DogCreate'>
        <div>
          <label>Name</label>
          <input type='text' name='name' value={ values?.name } placeholder='Dog name' onChange={ handleInputChange } />
          {errors?.name && <span>{errors.name}</span> }
        </div>
        <>{inputText('weight',errors, handleInputChange)}</>
        <>{inputText('height',errors, handleInputChange)}</>
        <>{inputText('life_span',errors, handleInputChange)}</>

        
        <label>New temperament: </label>
        <input type='text' name='addTemp' value={ values?.addTemp } placeholder='Temperament' onChange={ handleInputChange }/>
        <button type='button' name='addNewTemperament' onClick={() => handleAddNewTemperament() }>add</button>
        {errors?.addTemp && <span>{errors.addTemp}</span> }
            <span>{
                    values?.newTemps?.map((temp,i) =>
                        <span  key={temp}>
                            <b>{temp} </b> 
                            <span onClick={ () => handleRemoveNewTemperament(temp) }> X </span>
                        </span>)
                }
            </span>
                <br/><br/><br/>
                Choose the temperaments<br />
        <>{selectTemperament(temperaments, handleAdd)}</>    
                
        
        <div><input type={'submit'} value='Create'/>
        {errors?.final && <span>{errors.final}</span> }
        </div>
      </form>

    </div>
  )
}
