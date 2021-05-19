
import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import PlayerList from './PlayerList';
import PlayerEdit from './PlayerEdit';


function Header(){
  return (
    <div><h1>This is a header</h1></div>
  )
}

function App() {
  return (    
    <>
      <Router>      
               
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />  
            <Route path='/players' exact={true} component={PlayerList}/>
            <Route path='/players/:id' component={PlayerEdit}/>          
          </Switch>
 
      </Router>
    </>
  );
}



export default App;
