import { useState } from 'react';
import GentLeaderboard from './GentLeaderboard';
import MakePicksForm from './MakePicksForm';

const defaultUser = {
    signedIn: false
};

function PageLayout() {
    const [ user, setUser ] = useState(defaultUser)
    const [ makePicksVisible, setMakePicksVisible ] = useState(false)
    
    const handleLoginClick = () => {
        setUser({
            signedIn: true
        })
    }

    const handleMakePicksClick = () => {
        setMakePicksVisible(true);
    }

    return (
        <div className='App'>
            <span className='top-bar'>
                <div className='top-bar-element'></div>
                <h1 className='top-bar-element title'>Hello, friends</h1>
                <div className='top-bar-element'>
                    {user.signedIn ? 
                        (<button className='top-bar-button' onClick={handleMakePicksClick}>Make Picks</button>) :
                        (<button className='top-bar-button' onClick={handleLoginClick}>Login</button>)
                    }
                </div>
            </span>
            <MakePicksForm visible={makePicksVisible} setVisibility={setMakePicksVisible}/>
            <GentLeaderboard />
        </div>
    )
}

export default PageLayout;