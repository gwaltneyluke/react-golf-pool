import React, { useEffect, useState } from 'react';

function GentsLoading() {
    const [ ellipses, setEllipses ] = useState(1);

    useEffect(() => {
        const loading = () => {
            setTimeout(() => {
                setEllipses((ellipses + 1) % 4);
            }, 500);
        }

        loading();
    })

    const getEllipses = () => {
        return Array(ellipses).fill('.').join('');
    }

    return (
        <h2>Loading Leaderboard {getEllipses()}</h2>
    )
}

export default GentsLoading;