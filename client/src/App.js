import { Route } from 'react-router-dom';
import { Home } from './components/home/Home';
import { NavBar } from './components/navbar/NavBar';
import { DogCreate } from './components/create/DogCreate';
import { DogDetail } from './components/detail/DogDetail';
import { Dogs } from './components/dogs/Dogs';

import './App.css';

function App() {
  return (
    <>
    

      <Route exact path='/' component={ Home } />
      <Route path='/dogs' component={ NavBar } />
      <Route exact path='/dogs' component={ Dogs }/>
      <Route path='/dogs/create' component={ DogCreate }/>
      <Route path='/dogs/detail/:id' component={ DogDetail }/>
    
    </>
  );
}

export default App;
