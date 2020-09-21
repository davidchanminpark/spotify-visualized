import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import SignUp from './SignUp';
import Home from './Home';

function App() {

  return (
    <Switch>
      <Route exact path='/' component={SignUp}/>
      <Route path='/home' component={Home}/>
    </Switch>
    
  );
}

export default App;
