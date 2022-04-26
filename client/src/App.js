import { Route } from 'react-router-dom';
import { Home } from './components/Home';
import { NavBar } from './components/NavBar';
import { DogCreate } from './components/DogCreate';
import { DogDetail } from './components/DogDetail';
import { Dogs } from './components/Dogs';

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
