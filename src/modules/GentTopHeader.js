import React from 'react';

function GentLeaderboard(props) {
  return (
    <th scope='top'>
      <table class='row column leaderboard-header-table'>
        <tbody>
          <tr>
            <td class='position-column'>Pos</td>
            <td class='name-column'>Gentlemen</td>
            <td class='score-column'>Score</td>
          </tr>
        </tbody>
      </table>
    </th>
  );
}

export default GentLeaderboard;