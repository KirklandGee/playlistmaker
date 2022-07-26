import React from 'react';
import './SearchBar.css'

export class SearchBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.search = this.search.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  render() {
  return (
  <div className="SearchBar">
    <input placeholder="Enter A Song, Album, or Artist" 
            onChange={this.handleTermChange}
            onKeyDown={this.handleKeyPress}
    />
    <button className="SearchButton"
            onClick={this.search}>
            SEARCH
            </button>
  </div>
  ) 
  }

  handleTermChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.search()
    }
  }

  search() {
    this.props.onSearch(this.state.searchTerm)
  }

}