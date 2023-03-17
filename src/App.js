import Home from './pages/Home';
import Navigation from './Components/Navigation';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
