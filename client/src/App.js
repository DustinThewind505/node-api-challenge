import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

const App = ()=> {
  const [projects, setProjects] = useState([]);


    useEffect(() => {

      axios
      .get('http://localhost:4444/api/projects')
      .then(res => {
        console.log(res)
        setProjects([res.data]);
      })
      .catch(err => {
        console.log(`${err}`)
      });

    }, [])
 

    console.log(projects)
  return (
    <div className="App">
      <p>Projects</p>
      <p>{projects}</p>
 
    </div>
  );
}

export default App;