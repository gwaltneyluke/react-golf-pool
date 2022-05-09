import { useState, useEffect } from 'react';

import GentColumnHeader from './GentColumnHeader';
import GentsLoading from './GentsLoading';
import GentRow from './GentRow';
import GentTopHeader from './GentTopHeader';

import { getLeaderboard } from '../service/leaderboardService';

function GentLeaderboard(props) {
  const [ leaderboard, setLeaderboard ] = useState([]);
  const [ pickNumbers, setPickNumbers ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const board = await getLeaderboard();
      setLeaderboard(board);
      setPickNumbers(_getPickNumbers(board));
      setIsLoading(false);
    }

    fetchLeaderboard();
  }, []);

  return isLoading ? (<GentsLoading />) : (
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