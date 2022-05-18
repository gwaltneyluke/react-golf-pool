import { Auth } from 'aws-amplify';

const configuration = {
    userPoolId: 'us-east-1_z6lmJDlut',
    userPoolWebClientId: '48434soulv2pollqhon3ii4j74',
    oauth: {
        domain: 'jimstick-golf-pool.auth.us-east-1.amazoncognito.com',
        redirectSignIn: 'http://localhost:3000',
        redirectSignOut: 'http://localhost:3000/logout',
        responseType: 'code'
    }
}

const configureAuth = () => {
    Auth.configure(configuration);
};

const getUser = () => {
    return Auth.currentAuthenticatedUser()
        .then((creds) => {
            return _mapUserObject(creds);
        })
        .catch(_ => {
            return { isSignedIn: false };
        })
}

const signIn = () => {
    return Auth.federatedSignIn({ provider: 'Google' })
        .then((creds) => {
            return _mapUserObject(creds);
        })
        .catch(_ => {
            return { isSignedIn: false };
        });
};

const signOut = () => {
    return Auth.signOut();
}

const _mapUserObject = (creds) => {
    return {
        firstName: creds.signInUserSession.idToken.payload.given_name,
        isSignedIn: true
    };
}

export {
    configureAuth,
    getUser,
    signIn,
    signOut
}
