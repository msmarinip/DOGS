export const inputText = (lableName, name, errors, handleInputChange, style) => {
   return <div>
          <label> {lableName} </label>
          <label> min: </label><input type='number' name={`${name}Min`} maxLength={2} size={2} onChange={ handleInputChange } className={errors[`${name}Min`] ? style.inputReq : ''}/> 
          <label> max: </label><input type='number' name={`${name}Max`} maxLength={2} size={2} onChange={ handleInputChange } className={errors[`${name}Max`] ? style.inputReq : ''} />
          {errors[`${name}Min`]  && <span  className={style.spanReq}>min: {errors[`${name}Min`]} </span> }
          {errors[`${name}Max`] &&  <span  className={style.spanReq}>max: {errors[`${name}Max`]}</span> }
          
        </div>
}
