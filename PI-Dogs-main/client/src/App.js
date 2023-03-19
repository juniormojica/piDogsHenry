import './App.css';
import Nav from './components/Nav/Nav';
import Landing from "./components/Landing/Landing"
import Home from "./components/Home/Home"
import Detail from './components/Detail/Detail';


import { useLocation, Routes, Route } from "react-router-dom"
function App() {

  const location = useLocation()
  return (

    <div className="App">
      {location.pathname !== "/" ? <Nav /> : null}

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>




    </div>
  );
}

export default App;
