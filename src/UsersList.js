import React, { Component } from 'react';
import User from './User';
import './App.css';



class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
    }
  }
  
  componentDidMount() {
    console.log('UserList');
    fetch('https://randomuser.me/api/?results=4')
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        this.setState({
          results: data.results,
          resultsBuffer: data.results,
        })
      })
  }

  handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase()
    const results = this.state.results.filter((e) => {
      const fullName = e.name.first + e.name.last
      console.log('fullName = ', fullName)
      const searchValue = fullName.toLowerCase()
      return searchValue.indexOf(searchQuery) !== -1
    })
    if (event.target.value.trim() === '') {
      this.setState((state) => ({
        results: state.resultsBuffer,
      }))
      return
    }

    this.setState({
      results: results,
    })
  }

  render() {
    return (
      <div className="contacts">
        <h1>UserList</h1>
        <input
          type="text"
          className="search-field"
          onChange={this.handleSearch}
        />
        <ul className="contacts-list">
          {this.state.results.map((e) => {
            return (
              <User
                key={e.id.name}
                firstName={e.name.first}
                lastName={e.name.last}
                phone={e.phone}
                image={e.picture.large}
              />
            )
          })}
        </ul>
      </div>
        
     
    )
  }
}

export default UsersList
