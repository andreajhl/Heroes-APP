import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect} from "react-router-dom";

import Home from "./component/Home/home";
import Details from "./component/DetailsHeroe/detailsHeroe";
import Login from "./component/Login/login";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  const token= useSelector(state=>state.user)

  return (
    <div className="App">
      <Switch>
        <Route 
        exact path='/login' render={()=>{
          return !token ? <Login/> : <Redirect to='/' />
        }}
        
        />
        <Route exact path= '/' render={()=>{
              return token? <Home/> : <Redirect to='/login'/>
            }}
          />
          <Route path= '/heroe/:id' render={()=>{
              return token? <Details/> : <Redirect to='/login'/>
            }}
          />
      </Switch>
    </div>
  );
}

export default App;
