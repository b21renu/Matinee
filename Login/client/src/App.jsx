import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import HTS from './Components/HTS';
import Favts from './Components/Favts';
import Mood from './Components/Mood';

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/register' element={<Signup/>}></Route>
        <Route path ='/hts' element={<HTS/>}></Route>
        <Route path ='/favts' element={<Favts/>}></Route>
        <Route path ='/login' element={<Login/>}></Route>
        <Route path ='/mood' element={<Mood/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App