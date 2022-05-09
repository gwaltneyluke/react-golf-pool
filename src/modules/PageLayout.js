import GentLeaderboard from './GentLeaderboard';

function PageLayout() {
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
                            <button class='login-button'>Login</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <GentLeaderboard />
        </div>
    )
}

export default PageLayout;