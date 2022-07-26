
import React from 'react';
import './Playlist.css'
import {TrackList} from '../Tracklist/TrackList'


export class Playlist extends React.Component {

  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
          <TrackList tracks={this.props.tracks} 
                isRemoval={true} 
                onRemove={this.props.onRemove}
              />
        <button 
        className="Playlist-save"
        onClick={this.props.onSave}>
        SAVE TO SPOTIFY</button>
      </div>
      )}
  
  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }
  
}
