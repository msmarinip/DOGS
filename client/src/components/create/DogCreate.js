import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getDBTemperaments } from '../../redux/actions/actions';
import { inputText } from '../../helpers/inputText'
import { validateForm } from '../../helpers/validateForm'
import { selectTemperament } from '../../helpers/selectTemperament'; 
import { NavLink } from 'react-router-dom';

import style from './dogCreate.module.css'
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
  const [values, setValues] = React.useState({
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
  
  const [tempAdded, setTempAdded] = useState({
    msg:'',
    uuid: ''
  })
  const dispatch = useDispatch();
  const temperaments = useSelector(state => state.temperaments)
    useEffect(() => {
      dispatch(getDBTemperaments())
      return () => {
        
      }
      
  }, [dispatch])

    //Agrega al estado cada vez que hace click en los temperamentos de la api
    const handleAdd = ({target})  => {
      
        if(!values.temp.includes(target.value)){  
            setValues({
              ...values,
              temp: [...values.temp, target.value]
            })
            
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
    
      if(!err.final){ 
        addDog(values)
      }
    
  }
  //Maneja los temperamentos agregados por el usuario
  const handleAddNewTemperament = () => {
    const existsTemp = temperaments.find(t => t.temperament.toLowerCase().trim() === values.addTemp.toLowerCase().trim())
    if(!existsTemp && !values.newTemps.includes(values.addTemp) && values.addTemp !==''){
      setValues({
        ...values,
        newTemps: [...values.newTemps, values.addTemp],
        addTemp: ''
      })
    }
    else {
      setErrors({
        ...errors,
        addTemp: existsTemp
                ? `The temperament ${values.addTemp} is in the list. Please, check it there.`
                : values.addTemp !=='' 
                    ?`${values.addTemp} is already added. You can't add twice the same temperament.`
                    :`Enter the temperament to add.`
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
    // console.log(first)
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}dogs`, dogToAdd)
        // console.log(response.data.dataValues)
        setTempAdded({msg: 'ok', uuid: response.data.dataValues.uuid})
        // console.log(tempAdded)
    } catch (error) {
        // console.log(error)
        setTempAdded({msg: 'err'})
    }
}


  return (
    <div className={style.container}>
      <div className={style.containerLeft}></div>
      <div>
      {tempAdded.msg ==='ok' && <span>The dog has been added, click <NavLink to={`/dogs/detail/${tempAdded.uuid}`}>here</NavLink>  to see it</span>}
      { tempAdded.msg ==='err' &&  <span>There was an error. Please try again later.</span>}
      
      <form onSubmit={ handleSubmit } name='DogCreate'>
        <div>
          <label>Name</label>
          <input type='text' 
            name='name' 
            value={ values?.name } 
            placeholder='Dog name' 
            onChange={ handleInputChange } 
            className={errors?.name ? style.inputReq : ''}
            />
          {errors?.name && <span className={style.spanReq}>{errors.name}</span> }
        </div>
        <>{inputText('Weight','weight',errors, handleInputChange, style)}</>
        <>{inputText('Height','height',errors, handleInputChange, style)}</>
        <>{inputText('Life expectancy','life_span',errors, handleInputChange, style)}</>

        
        <label>New temperament: </label>
        <input type='text' name='addTemp' value={ values?.addTemp } placeholder='Temperament' onChange={ handleInputChange }/>
        <button 
          type='button' 
          name='addNewTemperament' 
          onClick={() => handleAddNewTemperament() } 
          className={errors?.addTemp ? style.btnDisabled : style.btn }
          >add</button>
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
        <div className={style.temperamentList}>{selectTemperament(temperaments, handleAdd, style)}</div>    
                
        
        <div><input type={'submit'} value='Create'/>
        {errors?.final && <span>{errors.final}</span> }
        </div>
      </form>
      </div>
    </div>
  )
}
