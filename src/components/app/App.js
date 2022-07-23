import React from 'react';
import './App.css';
import {Playlist} from '../Playlist/Playlist'
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { render } from '@testing-library/react';


export default class App extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        searchResults: [
          {
          name: 'Alright',
          artist: 'Kendrick Lamar',
          album: 'To Pimp a Butterfly',
          id: 0
        },
        {
          name: 'Gravity',
          artist: 'John Mayer',
          album: 'Continuum',
          id: 1
        },
        {
          name: 'Coins',
          artist: 'Local Natives',
          album: 'Sunlit Youth',
          id: 2
        },
      ],
      playlistName: "My Songs",
      playlistTracks: [
      {
        name: 'Gravity',
        artist: 'John Mayer',
        album: 'Continuum',
        id: 1
      },
     ]
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    }

  render() {
  return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar />
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist name={this.state.playlistName} 
                tracks={this.state.playlistTracks} 
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
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
}
