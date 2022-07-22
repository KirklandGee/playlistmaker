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
    }

  render() {
  return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar />
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks}/>
      </div>
    </div>
    </div>
    )
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    console.log(track)
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } 
    tracks.push(track)
    this.setState({playlistTracks: tracks})
    }

  }
