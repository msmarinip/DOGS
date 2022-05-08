export const inputText = (lableName, name, errors, handleInputChange, style, values) => {
   return <div className={style.formItem}>
          <label> {lableName} </label>
          <label> min: </label><input type='number' name={`${name}Min`} value={values[`${name}Min`]} maxLength={2} onChange={ handleInputChange } className={errors[`${name}Min`] ? style.numberReq : style.number}/> 
          <label> max: </label><input type='number' name={`${name}Max`} value={values[`${name}Max`]} maxLength={2} onChange={ handleInputChange } className={errors[`${name}Max`] ? style.numberReq : style.number} />
          {errors[`${name}Min`]  && <span  className={style.spanReq}>  min: {errors[`${name}Min`]} </span> }
          {errors[`${name}Max`] &&  <span  className={style.spanReq}>  max: {errors[`${name}Max`]}</span> }
          
        </div>
}
