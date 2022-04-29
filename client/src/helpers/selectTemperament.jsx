export const selectTemperament = (temperaments,  handleAdd) => {
  return <div>
  {
      temperaments?.map(t => <div key={`${t.id}_${t.value}`}>
        <input name='newTemperaments' type='checkbox' value={t.id} key={t.id} onClick={handleAdd}/>{t.temperament} {t.id}</div>
      )
  }
  </div>
  
  
  
  
  
  
}


/* <div><label>Temperament</label>
            <select name='temperament' onChange={handleCurrentValue}>
                <option value=''>Choose a temperament</option>
                {
                    temperaments?.map(t => <option value={t.temperament} id={t.id} key={t.id}>{t.temperament}</option>)
                }
            </select>
            <button type='button' name='add' onClick={() => handleAdd() }>add</button>
            <span>{
                    addTemp?.map((temp,i) =>
                        <span  key={temp}>
                            <b>{temp} </b> 
                            <span onClick={ () => handleRemove(i) }> X </span>
                        </span>)
                }
            </span>
        </div> */
