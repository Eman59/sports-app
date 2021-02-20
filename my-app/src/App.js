import React, { useEffect, useState } from "react";
import axios from "axios";
import "./app.css"

function App() {
  const [players, setPlayers] = useState([]);
  // const [upMatches, setUpMatches] = useState([]);
  const[search, setSearch] = useState('');

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://api.npoint.io/d6bd0efc05639084eb17/`
      );
      console.log(res.data.playerList)
      setPlayers(res.data.playerList);
      // setUpMatches(res.UpComingMatchesList)
    }
    getData();
  });

  const filteredPlayers = players.filter( player => {
    return player.PFName.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="container">

      <div className="row">
        <div className="col-md-12">
          <div class="form-group">
            <input className="form-control" type="text" placeholder="Search Player...."  onChange={ e => setSearch(e.target.value)}/>
          </div>
        </div>
      </div>

      <div className="row">

        {
          filteredPlayers.map((player, index) => {
            return (
              <>

                <div className="col-md-3">
                  <div className="card mb-3" >
                    <img src={`./player-images/${player.Id}.jpg`} className="card-img-top" alt="player.jpg"/>
                    <div className="card-body">
                      <h5 className="card-title">{player.PFName}</h5>
                      <p className="card-text">Skill: {player.SkillDesc}</p>
                      <p className="card-text">{`Player Value $ ${player.Value}`}</p>
                      <p className="card-text">{`Upcoming Matches - ${player.CCode} vs ${player.UpComingMatchesList[0].VsCCode}`}</p>
                      <p className="card-text">MDate: "{player.UpComingMatchesList[0].MDate}"</p>
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
