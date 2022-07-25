
import React from 'react';
import './SearchResults.css'
import { TrackList } from '../Tracklist/TrackList';


export class SearchResults extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
    this.search = this.search.bind(this)
  }
  
  render() {
  return (
  <div className="SearchResults">
    <h2>Results</h2>
     <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
  </div>
  ) 
  }

  search() {
    this.props.onSearch(this.state)
  }

}
