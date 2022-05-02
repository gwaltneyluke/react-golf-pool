import React from 'react';

function GentRow({ gent }) {
  const { position, name, score, picks } = gent;

  return (
    <tr>
      <th scope='row'>
        <table class='row leaderboard-header-table'>
          <tbody>
            <tr>
              <td>{position}</td>
              <td>{name}</td>
              <td>{score}</td>
            </tr>
          </tbody>
        </table>
      </th>
      {picks.map(pick => (
        <td>
          <table>
            <tbody>
              <tr>
                <td>{pick.playerPosition}</td>
                <td>{pick.playerName}</td>
                <td>{pick.playerScore}</td>
                <td>{pick.chips}</td>
              </tr>
            </tbody>
          </table>
        </td>
      ))}
    </tr>
  );
}

export default GentRow;