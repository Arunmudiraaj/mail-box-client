import Home from './pages/Home';
import Navigation from './Components/Navigation';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='user' element={<User/>}/>

      </Routes>
    </div>
  );
}

export default App;
