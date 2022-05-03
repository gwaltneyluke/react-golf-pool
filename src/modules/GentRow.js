import React from 'react';

function GentRow({ gent }) {
  const { position, name, score, picks } = gent;

  return (
    <tr>
      <th scope='row'>
        <table class='row leaderboard-header-table'>
          <tbody>
            <tr>
              <td class='position-column'>{position}</td>
              <td class='name-column'>{name}</td>
              <td class='score-column'>{score}</td>
            </tr>
          </tbody>
        </table>
      </th>
      {picks.map(pick => (
        <td>
          <table class='player-column-table'>
            <tbody>
              <tr>
                <td class='position-column'>{pick.playerPosition}</td>
                <td class='name-column'>{pick.playerName}</td>
                <td class='score-column'>{pick.playerScore}</td>
                <td class='chips-column'>{pick.chips}</td>
              </tr>
            </tbody>
          </table>
        </td>
      ))}
    </tr>
  );
}

export default GentRow;