'use strict';

// module.exports = {
//     'githubAuth': {
//         'clientID': process.env.GITHUB_KEY,
//         'clientSecret': process.env.GITHUB_SECRET,
//         'callbackURL': process.env.APP_URL + 'auth/github/callback'
//     }
// };

console.log('config/auth.js -- MAKE SURE YOU CHANGE TO ENV BEFORE DEPLOY');
//MAKE SURE AND CHANGE BEFORE DEPLOYING

module.exports = {

    'facebookAuth': {
        'clientID': '437816833334621', // your App ID
        'clientSecret': 'ace9988bfd11ad08d003ca3044dd9e50', // your App Secret
        'callbackURL': 'http://localhost:3000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'googleAuth': {
        'clientID': '490469934850-deu4ok0a7epif0t1hlf7mcmalg6mp85i.apps.googleusercontent.com', // your Client ID
        'clientSecret': '4F47SxmVC6taXVbUaUt5tiDR', // your Client Secret
        'callbackURL': 'http://localhost:3000/auth/google/callback'
    },

    'githubAuth': {
        'clientID': '1bc681ddcf899adfd749',
        'clientSecret': 'c53e4dc6187d61f1516f827dca586b76058df9ff',
        'callbackURL': "http://localhost:3000/auth/github/callback"
    },

    'twitterAuth': {
        'consumerKey': 'Lxr3JX8gJ0sloGp22sy2Zoren',
        'consumerSecret': 'wKOtUZipDVEKJud386Kmq29A7HHifsegeWIN9awnp8uyRMmvp1',
        'callbackURL': "http://localhost:3000/auth/twitter/callback"
    },
        // 'instagramAuth': {
    //     'clientID': '',
    //     'clientSecret': ' ',
    //     'callbackURL': 'http://127.0.0.1:3000/auth/instagram/callback'
    // },
};

