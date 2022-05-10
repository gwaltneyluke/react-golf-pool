import { useState } from 'react';
import GentLeaderboard from './GentLeaderboard';

const defaultUser = {
    signedIn: false
};

function PageLayout() {
    const [ user, setUser ] = useState(defaultUser)
    
    const handleLoginClick = () => {
        setUser({
            signedIn: true
        })
    }

    return (
        <div class='App'>
            <span class='top-bar'>
                <div class='top-bar-element'></div>
                <h1 class='top-bar-element title'>Hello, friends</h1>
                <div class='top-bar-element'>
                    {user.signedIn ? 
                        (<button class='top-bar-button'>Make Picks</button>) :
                        (<button class='top-bar-button' onClick={handleLoginClick}>Login</button>)
                    }
                </div>
            </span>
            <GentLeaderboard />
        </div>
    )
}

export default PageLayout;