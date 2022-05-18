import { useState, useEffect } from 'react';

import GentLeaderboard from './GentLeaderboard';
import MakePicksForm from './MakePicksForm';

import { configureAuth, getUser, signIn, signOut } from '../service/authService'

const defaultUser = {
    isSignedIn: false
};

function PageLayout() {
    const [ user, setUser ] = useState(defaultUser)
    const [ makePicksVisible, setMakePicksVisible ] = useState(false)

    configureAuth();

    useEffect(() => {
        const getCurrentUser = async () => {
            let user = await getUser();
            setUser(user);
        }
        
        getCurrentUser();
    }, []);

    const handleLoginClick = async () => {
        let user = await signIn();
        setUser(user);
    }

    const handleLogoutClick = async () => {
        await signOut();
        setUser(defaultUser);
    }

    const handleMakePicksClick = () => {
        setMakePicksVisible(true);
    }

    return (
        <div className='App'>
            <span className='top-bar'>
                <div className='top-bar-element'></div>
                <h1 className='top-bar-element title'>Hello, {user.isSignedIn ? user.firstName : 'friends'}</h1>
                <div className='top-bar-element'>
                    {user.isSignedIn ? 
                        (<div>
                            <button className='top-bar-button' onClick={handleLogoutClick}>Logout</button>
                            <button className='top-bar-button' onClick={handleMakePicksClick}>Make Picks</button>
                        </div>) :
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