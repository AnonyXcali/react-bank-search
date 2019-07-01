import React, { Component } from 'react';

class Search extends Component {
  state = {
    value: ''
  }

  handleChange = (e) => {
    this.setState({
      value : [e.target.name] = e.target.value
    })
    this.props.recieveChange(e.target.value);
  }


  render() {
    return (
      <input className="inputBox" type='text' name='searchfield' placeholder='Enter search query' value={this.state.value} onChange={this.handleChange}/>
    );
  }
}

export default Search;
