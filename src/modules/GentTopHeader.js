import React from 'react';

function GentLeaderboard(props) {
  return (
    <th scope='top'>
      <table className='row column leaderboard-header-table'>
        <tbody>
          <tr>
            <td className='position-column'>Pos</td>
            <td className='name-column'>Gentlemen</td>
            <td className='score-column'>Score</td>
          </tr>
        </tbody>
      </table>
    </th>
  );
}

export default GentLeaderboard;