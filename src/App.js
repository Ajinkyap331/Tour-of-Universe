import './App.css';
import { RenderCanvas } from './Components/RenderCanvas';
import { Planet } from './Components/Planet';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {moon} from './Components/Planetsdata'
import {Redirect} from 'react-router-dom'
import { _data } from './Components/Planetsdata';



function App() {
  const [toMoon, setMoon] = useState(false)
  const [toEarth, setEarth] = useState(false)
  const changeMoon = () => {
    setMoon(false)
    setMoon(true)
  } 

  const changeEarth = () => {
    setEarth(false)
    console.log(toEarth)
    setEarth(true)
  } 

  return (
    <Router>
      {toMoon ? <Redirect to="/moon" /> : <></>}
      {toEarth ? <Redirect to="/" /> : <></>}
      <Switch>
        <Route exact path="/">
          <div className="App" style={{ height: '100vh', width: '100vw' }}>
            <RenderCanvas toMoon = {changeMoon}/>
          </div>
        </Route>
        <Route exact path="/moon">
          <Canvas style={{ height: '100vh', width: '100vw' }}>
            <Suspense fallback={null}>
              <Planet type={moon} toEarth={changeEarth}/>
            </Suspense>
          </Canvas>
        </Route>
        <Route exact path="/mars">
          
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
