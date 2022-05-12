import React from 'react';

function GentRow({ gent }) {
  const { position, name, score, picks } = gent;

  return (
    <tr>
      <th scope='row'>
        <table className='row leaderboard-header-table'>
          <tbody>
            <tr>
              <td className='position-column'>{position}</td>
              <td className='name-column'>{name}</td>
              <td className='score-column'>{score}</td>
            </tr>
          </tbody>
        </table>
      </th>
      {picks.map((pick, idx) => (
        <td key={`gent-${name}-pick-${idx}`}>
          <table className='player-column-table'>
            <tbody>
              <tr>
                <td className='position-column'>{pick.playerPosition}</td>
                <td className='name-column'>{pick.playerName}</td>
                <td className='score-column'>{pick.playerScore}</td>
                <td className='chips-column'>{pick.chips}</td>
              </tr>
            </tbody>
          </table>
        </td>
      ))}
    </tr>
  );
}

export default GentRow;