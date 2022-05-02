import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDogByName } from '../redux/actions/actions';

export const DogSearchByName = () => {
    const dispatch = useDispatch();
    const {searchName, source} = useSelector(state => state)
    const [search, setSearch] = useState('')
    const handleChange = ({ target }) => {
        setSearch(target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(search);
        dispatch(getDogByName(search, source));
        setSearch('')
    }
  return (
    <div>
        <form onSubmit={ handleSubmit }>
            <label>By name: </label>
            <input type='text' name='name' value={ search } onChange={ handleChange } />
            <button type='submit' className='search' value='Search'>Search</button>
        </form>
        {searchName}
    </div>
  )
}
