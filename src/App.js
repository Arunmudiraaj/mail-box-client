import Home from './pages/Home';
import Navigation from './Components/Navigation';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <div>learn react</div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </div>
  );
}

export default App;
