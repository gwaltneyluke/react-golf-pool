import React from 'react';

function GentColumnHeader({ playerNumber }) {
  return (
    <th key={`player-${playerNumber}-column-header`} scope='column'>{playerNumber}</th>
  );
}

export default GentColumnHeader;