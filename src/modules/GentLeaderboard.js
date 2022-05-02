import React, { useState, useEffect } from 'react';

import GentTopHeader from './GentTopHeader';
import GentColumnHeader from './GentColumnHeader';
import GentRow from './GentRow';

import { getLeaderboard } from '../service/leaderboardService';

function GentLeaderboard(props) {
  const [ leaderboard, setLeaderboard ] = useState([]);
  const [ pickNumbers, setPickNumbers ] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = () => {
      const board = getLeaderboard();
      setLeaderboard(board);
      setPickNumbers(_getPickNumbers(board));
    }

    fetchLeaderboard();
  }, []);

  return (
    <div class='leaderboard-container'>
      <table class='leaderboard-table'>
        <thead>
          <tr>
            <GentTopHeader />
            {pickNumbers.map(playerNumber => (
              <GentColumnHeader playerNumber={playerNumber}/>
            ))}
          </tr>
        </thead>
        <tbody class='leaderboard-table-body'>
          {leaderboard.map(gent => (
            <GentRow gent={gent} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const _getPickNumbers = (board) => {
  let maxPickNumber = Math.max(...board.map(b => b.picks.length));
  return Array(maxPickNumber).fill(null).map((_, idx) => idx+1);
}

export default GentLeaderboard;