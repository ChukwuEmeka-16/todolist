import Login from './components/Login';
import './App.scss';
import {  Route, Routes } from 'react-router-dom'
import Signup from './components/Signup';
import Home from './components/Home';



function App() {
  return (
    <>
      




  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route  path='/signup' element={<Signup/>}/>
     <Route path='/home' element={<Home/>} />
     
  </Routes>
    </>
  );
  }

export default App;
