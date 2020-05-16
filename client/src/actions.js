import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Actions = () => {
    const [actions, setActions] = useState([]);


    useEffect(() => {

        axios
        .get('http://localhost:4444/api/projects/1/actions')
        .then(res => {
          setActions(res.data);
        })
        .catch(err => {
          console.log(`${err}`)
        });
  
      }, [])

    return(
        <div>
            {actions.map((action, index) => <div><p>{action.name}</p><p>{action.description}</p></div>)}
        </div>
    )
}

export default Actions;