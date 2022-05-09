export const selectTemperament = (temperaments,  handleAdd, style) => {
  return <>
  {
      temperaments?.map(t => <div key={`${t.id}_${t.value}`} className={style.temperamentItem}>
        <input name='newTemperaments' type='checkbox' value={t.id} key={t.id} onClick={handleAdd}/>{t.temperament} </div>
      )
  }
  </>
   
}
