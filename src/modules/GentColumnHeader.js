import React from 'react';

function GentColumnHeader({ playerNumber }) {
  return (
    <th key={`player-${playerNumber}-column-header`} scope='column'>
      <table class='player-column-table'>
        <tbody>
          <tr>
            <td class='position-column'>Pos</td>
            <td class='name-column'>Player {playerNumber}</td>
            <td class='score-column'>Score</td>
            <td class='chips-column'>Chips</td>
          </tr>
        </tbody>
      </table>
    </th>
  );
}

export default GentColumnHeader;