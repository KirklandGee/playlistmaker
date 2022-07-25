let accessToken;
const clientID = 'd927da0e137e4a229451e1ca106c6e21'
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
      } else {
        const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`
        window.location = accessURL;
      }
    }
  },
    
  search(searchTerm) {
    const accessToken = Spotify.getAccessToken()
    const endpoint = 'https://api.spotify.com/v1/search?type=track&q=' + searchTerm
    return fetch(endpoint, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    .then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      if (!jsonResponse.tracks) {
        return [];
      } else {
      console.log(jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      })))
      }
    })
  }
}

export {Spotify}

