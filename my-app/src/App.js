import React, { useEffect, useState } from "react";
import axios from "axios";
import "./app.css"

function App() {
  const [players, setPlayers] = useState([]);
  const[search, setSearch] = useState('');

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://run.mocky.io/v3/f55120ed-1fd6-4a38-943c-658c70edc966`
      );
      console.log(res.data)
      setPlayers(res.data);
    }
    getData();
  },[]);

  const filteredPlayers = players.filter( player => {
    return player.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Search Player...."  onChange={ e => setSearch(e.target.value)}/>
          </div>
        </div>
      </div>
      <div className="row">
        {
          filteredPlayers.map((player) => {
            return (
              <>
                <div className="col-md-3" key={player.id}>
                  <div className="card mb-3">
                    <img src={player.photos} className="card-img-top" alt="player.jpg"/>
                    <div className="card-body">
                      <h5 className="card-title">{player.name}</h5>
                      <p><span>Age: </span>{player.age}</p>
                      <p className="card-text"><span>Birth:</span> {player.birth}</p>
                      <p className="card-text"> <span>Player Value: </span>€{player.value}</p>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
