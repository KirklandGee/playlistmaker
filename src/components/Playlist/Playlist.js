
import React from 'react';
import './Playlist.css'
import {TrackList} from '../Tracklist/TrackList'


export class Playlist extends React.Component {
  render() {
  return (
<div className="Playlist">
  <input defaultValue={'New Playlist'} />
    <TrackList tracks={this.props.tracks} 
          isRemoval={true} 
          onRemove={this.props.onRemove}
        />
  <button className="Playlist-save">SAVE TO SPOTIFY</button>
</div>

 )}

}
