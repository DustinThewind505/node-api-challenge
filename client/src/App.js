import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Actions from './actions';
import './App.css';

const App = ()=> {
  const [projects, setProjects] = useState([]);

    useEffect(() => {

      axios
      .get('http://localhost:4444/api/projects/1')
      .then(res => {
        console.log(projects)
        setProjects(res.data);
      })
      .catch(err => {
        console.log(`${err}`)
      });

    }, [])
 

  return (
    <Router>
    <div className="App">
      <p>Projects</p>
      <NavLink to="/actions" className='project-card'>
          <p>{projects.name}</p>
          <p>{projects.description}</p>
        </NavLink>
      <Route path="/actions" component={Actions}/>
 
    </div>
    </Router>
  );
}

export default App;