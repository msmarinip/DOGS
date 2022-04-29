import React from 'react'
// import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import mainImg from '../assets/Perrito.png'
// import { getApiTemperaments } from '../redux/actions/actions'
export const Home = () => {

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getApiTemperaments())
  
  // }, [dispatch])
  

  return (
    <>
    
    <div>
      <center>
        <img src={mainImg} alt='Welcome' width={500}/>
        <Link to='/dogs'>
            [ingresar]
        </Link>
      </center>
    </div>

    </>
  )
}
