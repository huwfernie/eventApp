// config flie used in oAuth controller

module.exports = {
  github: {
    loginURL: 'https://github.com/login/oauth/authorize',
    accessTokenURL: 'https://github.com/login/oauth/access_token',
    profileURL: 'https://api.github.com/user',
    clientId: process.env.eventApp_GITHUB_CLIENT_ID,
    clientSecret: process.env.eventApp_GITHUB_CLIENT_SECRET,
    scope: 'user:email'
  },

  instagram: {
    loginURL: '//https://api.instagram.com/oauth/authorize/?client_id=081e09dfcabd4ec38a730f3895732495&redirect_uri=https://guarded-refuge-81006.herokuapp.com/oauth/instagram&response_type=code',
    redirectUri: 'https://guarded-refuge-81006.herokuapp.com',
    accessTokenURL: 'https://api.instagram.com/oauth/access_token',
    clientId: process.env.eventApp_INSTA_CLIENT_ID,
    clientSecret: process.env.eventApp_INSTA_CLIENT_SECRET,
    scope: 'user:email'
  },

  facebook: {
    loginURL: 'https://www.facebook.com/v2.8/dialog/oauth',
    accessTokenURL: 'https://graph.facebook.com/v2.8/oauth/access_token',
    profileURL: '#',
    clientId: process.env.eventApp_FB_CLIENT_ID,
    clientSecret: process.env.eventApp_FB_CLIENT_SECRET,
    scope: 'user:email'
  }
};
