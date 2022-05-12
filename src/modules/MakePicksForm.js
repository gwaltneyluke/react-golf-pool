import React, { useState, useEffect } from 'react';
import { mockPlayerNames } from '../service/playerService';

const numberOfPicks = 3;

const MakePicksForm = ({
    visible,
    setVisibility
}) => {
    const [ players, setPlayers ] = useState([]);

    useEffect(() => {
        setPlayers(mockPlayerNames);
    }, []);

    const handleClose = () => {
        setVisibility(false);
    }

    const getVisibility = () => {
        return visible ? {} : { visibility: 'hidden' }
    }

    return (
        <div className='make-picks-form' style={getVisibility()}>
            <button className='close-make-picks-form' onClick={handleClose}>X</button>
            <h1>Make Your Picks</h1>
            <table className='make-picks-table'>
                <thead className='make-picks-table-header'>
                    <tr>
                        <th></th>
                        <th>Player</th>
                        <th>Chips</th>
                    </tr>
                </thead>
                <tbody className='make-picks-table-body'>
                    {Array(numberOfPicks).fill(null).map((_, idx) => (
                        <tr key={`pick-number-${idx}`}>
                            <td>
                                <label>Pick #{idx}</label>
                            </td>
                            <td>
                                <select>
                                    {players.map((player) => (
                                        <option value={player}>{player}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input type='text'></input>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='submit-make-picks-form'>Submit</button>
        </div>
    )
}

export default MakePicksForm;