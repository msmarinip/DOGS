export const orderBy = (label, byAsc, byDesc, style, handleOrder) => {
   return <><span> { label }:</span> <span className={style.arrow} onClick={() => handleOrder(byDesc, 'DESC')}>⇩</span>
                           <span className={style.arrow} onClick={() => handleOrder(byAsc, 'ASC')}>⇧&nbsp;&nbsp;&nbsp;</span></>
}

