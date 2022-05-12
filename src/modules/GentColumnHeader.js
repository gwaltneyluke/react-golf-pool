import React from 'react';

function GentColumnHeader({ playerNumber }) {
  return (
    <th key={`player-${playerNumber}-column-header`} scope='column'>
      <table className='player-column-table'>
        <tbody>
          <tr>
            <td className='position-column'>Pos</td>
            <td className='name-column'>Player {playerNumber}</td>
            <td className='score-column'>Score</td>
            <td className='chips-column'>Chips</td>
          </tr>
        </tbody>
      </table>
    </th>
  );
}

export default GentColumnHeader;