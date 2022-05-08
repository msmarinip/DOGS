export const orderBy = (label, by, style, handleOrder) => {
   return <><span> { label }:</span> <span className={style.arrow} onClick={() => handleOrder(by, 'DESC')}>⇩</span>
                           <span className={style.arrow} onClick={() => handleOrder(by, 'ASC')}>⇧&nbsp;&nbsp;&nbsp;</span></>
}

