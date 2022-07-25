const accessToken = ''
const clientId = 'd927da0e137e4a229451e1ca106c6e21'
const redirectURL = 'http://localhost:3000/'

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken
    } else {
      const accessTokenMatch = window.location.href.match('/access_token=([^&]*)/')
      const expiresInMatch = window.location.href.match('/expires_in=([^&]*)/')
      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1])
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
window.history.pushState('Access Token', null, '/');
        return accessToken;
      }
    }
  }
}

export Spotify

