const clientID = 'd927da0e137e4a229451e1ca106c6e21'
const redirectURL = 'http://localhost:3000'
let accessToken;


const Spotify = {

  getAccessToken(accessToken) {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
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
    },
  
  search(searchTerm) {
    const newToken = Spotify.getAccessToken(accessToken)
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${newToken}`
      }
    })
    .then(response => response.json()
    ).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      } else {
        return jsonResponse.tracks.items.map((track) => ({
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        id: track.id,
        uri: track.uri
      }))
      }
    })
  },

  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }
    alert(accessToken)
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`}
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers: headers }
    ).then(response => response.json())
    .then(jsonResponse => { 
        userId = jsonResponse.id;
        alert(userId)
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
        {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: playlistName })
      }
    )}).then(response =>  response.json()
    ).then(jsonResponse => {
        const playlistID = jsonResponse.id;
        alert(playlistID)
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
    })
    }) 
  }


}

export {Spotify}

