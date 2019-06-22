import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Header extends Component {

  render() {
    return (
      <div className="outerDiv">
          <div>
            <div className='bar1 bar'></div>
            <div className='bar2 bar'></div>
          </div>
          <div className="header">
            <h1>Bank Search Application</h1>
          </div>
          <div className='favouriteLink'>
            <Link to={{
              pathname: '/favourites',
              state: { data: this.props.data }
            }}>View Favourites
            <i className={'isFavourite favIcon fas fa-star'}></i>
          </Link>
          </div>
      </div>
    );
  }
}

export default Header
