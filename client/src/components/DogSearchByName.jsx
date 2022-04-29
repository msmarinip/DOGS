import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getDogByName } from '../redux/actions/actions';

export const DogSearchByName = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')
    const handleChange = ({ target }) => {
        setSearch(target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(search);
        dispatch(getDogByName(search));
    }
  return (
    <div>Name: 
        <form onSubmit={ handleSubmit }>
            <input type='text' name='name' value={ search } onChange={ handleChange } />
            <input type='submit' value='Search' />
        </form>
    </div>
  )
}
