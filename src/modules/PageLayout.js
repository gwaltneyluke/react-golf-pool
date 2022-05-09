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
            <table class='title-and-login-bar'>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <h1 class='title'>Hello, friends</h1>
                        </td>
                        <td>
                            {user.signedIn ? 
                                (<button class='make-picks-button'>Make Picks</button>) :
                                (<button class='login-button' onClick={handleLoginClick}>Login</button>)
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
            <GentLeaderboard />
        </div>
    )
}

export default PageLayout;