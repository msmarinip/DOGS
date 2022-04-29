export const inputText = (name, errors, handleInputChange) => {
   return <div>
          <label> {name} </label>
          <label> Min </label><input type='text' name={`${name}Min`} maxLength={2} size={2} onChange={ handleInputChange } /> 
          <label> Max </label><input type='text' name={`${name}Max`} maxLength={2} size={2} onChange={ handleInputChange } />
          {errors[`${name}Min`] && <span>{errors[`${name}Min`]}</span> }
          {errors[`${name}Max`] && <span>{errors[`${name}Max`]}</span> }
          
        </div>
}



/* <div>
          <label> Weight </label>
          <label> Min </label><input type='text' name='weightMin' maxLength={2} size={2} onChange={ handleInputChange } /> 
          <label> Max </label><input type='text' name='weightMax' maxLength={2} size={2} onChange={ handleInputChange } />
          <div>
            {errors?.weightMin && <span>{errors.weightMin}</span> }
            {errors?.weightMax && <span>{errors.weightMax}</span> }
          </div>
        </div>
        <div>
          <label> Height </label>
          <label> Min </label><input type='text' name='heightMin' maxLength={2} size={2} onChange={ handleInputChange } /> 
          <label> Max </label><input type='text' name='heightMax' maxLength={2} size={2} onChange={ handleInputChange } />
          {errors?.heightMin && <span>{errors.heightMin}</span> }
          {errors?.heightMax && <span>{errors.heightMax}</span> }
        </div> 
        <div>
          <label> Life span </label>
          <label> Min </label><input type='text' name='life_spanMin' maxLength={2} size={2} onChange={ handleInputChange } /> 
          <label> Max </label><input type='text' name='life_spanMax' maxLength={2} size={2} onChange={ handleInputChange } />
          {errors?.life_spanMin && <span>{errors.life_spanMin}</span> }
          {errors?.life_spanMax && <span>{errors.life_spanMax}</span> }
        </div> */
        