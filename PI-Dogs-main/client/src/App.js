import './App.css';
import Nav from './components/Nav/Nav';
import Landing from "./components/Landing/Landing"
import Home from "./components/Home/Home"


import { useLocation, Routes, Route } from "react-router-dom"
function App() {

  const location = useLocation()
  return (

    <div className="App">
      {location.pathname !== "/" ? <Nav /> : null}
      <Landing />
      <Home />

      <h1>Henry Dogs</h1>
    </div>
  );
}

export default App;
