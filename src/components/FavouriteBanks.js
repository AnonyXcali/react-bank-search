import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class FavouriteBanks extends Component {

  state = {
    currentFavourites : []
  }

  componentDidMount(){
    this.setState({
      currentFavourites : this.props.location.state.data
    })
  }

  renderData = (data) => {
    let getTables = data.map( (key, value) => {
      value +=1;
      return (
            <tr key={value}>
                <td key={'val_'+value}>{value}</td>
                <td key={'name_'+value}>{key.bank_name}</td>
                <td key={'ifsc_'+value}>
                  {key.ifsc}
                </td>
                <td key={'city_'+value}>{key.city}</td>
            </tr>
          )
    })

    return(
    <div className='results'>
    <h3 className='showingResultsFor'>Favourites</h3>
      <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>Bank Name</th>
              <th>IFSC</th>
              <th>City</th>
            </tr>
          {getTables}
          </tbody>
      </table>
      <Link className='_backLinkInFav' to='/'>Go back?</Link>
    </div>
    )
  }

  render(){
    if(this.state.currentFavourites && this.state.currentFavourites.length > 0){
        return (this.renderData(this.props.location.state.data))
    }else{
      return(
        <div className='noData'>
          <h1 className='noFavourites'>No Favourites!</h1>
          <i className="fas fa-search-dollar"></i>
          <Link className='backLinkInFav' to='/'>Go back?</Link>
        </div>
        )
      }
  }
}

export default FavouriteBanks;
