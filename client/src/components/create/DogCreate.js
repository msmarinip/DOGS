import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addNewDogName, getDBTemperaments } from '../../redux/actions/actions';
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

  const initValues = {
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

  }
  const [values, setValues] = React.useState(initValues)
  
  const [dogAdded, setDogAdded] = useState({
    msg:'',
    uuid: ''
  })
  const dispatch = useDispatch();
  const {temperaments, dogsNames} = useSelector(state => state)
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
      if(dogsNames.includes(values.name.toLowerCase())){
        setErrors({
          ...errors,
          final: 'There is already a bread dog with the name you enter.'
        })
      }
      if(!err.final && !dogsNames.includes(values.name.toLowerCase()) ){ 
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

    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}dogs`, dogToAdd)
        setDogAdded({msg: 'ok', uuid: response.data.dataValues.uuid})
        dispatch(addNewDogName(values.name))
        setValues(initValues)
    } catch (error) {
        setDogAdded({msg: 'err'})
    }
}


  return (
    <div className={style.container}>
      <div className={style.containerLeft}></div>
      <div className={style.containerRight}>
      { dogAdded.msg ==='ok'  && <span>The dog has been added, click <NavLink to={`/dogs/detail/${dogAdded.uuid}`}>here</NavLink>  to see it</span>}
      { dogAdded.msg ==='err' &&  <span>There was an error. Please try again later.</span>}
      
      <form onSubmit={ handleSubmit } name='DogCreate'>
        <div className={style.formItem}>
          <label>Name:  </label>
          <input type='text' 
            name='name' 
            value={ values?.name } 
            placeholder='Dog name' 
            onChange={ handleInputChange } 
            className={errors?.name ? style.inputReq : ''}
            />
          {errors?.name && <span className={style.spanReq}>  {errors.name}</span> }
        </div>
        
        <>{inputText('Weight','weight',errors, handleInputChange, style, values)}</>
        <>{inputText('Height','height',errors, handleInputChange, style, values)}</>
        <>{inputText('Life expectancy','life_span',errors, handleInputChange, style, values)}</>

        <div className={style.formItem}>
        <label>New temperament: </label>
        <input type='text' name='addTemp' value={ values?.addTemp } placeholder='Temperament' onChange={ handleInputChange }/>
        <button 
          type='button' 
          name='addNewTemperament' 
          onClick={() => handleAddNewTemperament() } 
          className={errors?.addTemp ? style.btnDisabled : style.btn }
          >  add</button>
          {errors?.addTemp && <span> {errors.addTemp}</span> }
            <span>{
                    values?.newTemps?.map((temp,i) =>
                        <span  key={temp}>
                            <b>{temp} </b> 
                            <span onClick={ () => handleRemoveNewTemperament(temp) }> X </span>
                        </span>)
                }
            </span>
        </div>
        <div className={style.formItem}>
        <label>Choose the temperaments</label><br />
        <div className={style.temperamentList}>{selectTemperament(temperaments, handleAdd, style)}</div>    
        
        <div><input type={'submit'} value='Create'/>
        {errors?.final && <span> {errors.final}</span> }
        </div>
        </div>
      </form>
      </div>
    </div>
  )
}
