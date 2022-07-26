import React from 'react';
import './App.css';
import {Playlist} from '../Playlist/Playlist'
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { render } from '@testing-library/react';
import { Spotify } from '../../util/Spotify';

export default class App extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
      searchResults: [],
      playlistName: "My Songs",
      playlistTracks: [{
        name: "New Light",
        album: "Sob Rock",
        artist: "John Mayer",
        id: "4T6FWA703h6H7zk1FoSARw",
        uri: "spotify:track:4T6FWA703h6H7zk1FoSARw"
          },    
        {
        name: 'Gravity',
        artist: 'John Mayer',
        album: 'Continuum',
        id: 1,
        uri: 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6'
        },]
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
    }

  render() {
  return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar 
        onSearch={this.search}
      />
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} 
                      onAdd={this.addTrack}
                      />
        <Playlist name={this.state.playlistName} 
                tracks={this.state.playlistTracks} 
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
                />
      </div>
    </div>
    </div>
    )
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } 
    tracks.push(track)
    this.setState({playlistTracks: tracks})
    }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    this.setState({
      playlistTracks: tracks 
     })
    }
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(searchTerm) {
    Spotify.search(searchTerm)
    .then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

}
