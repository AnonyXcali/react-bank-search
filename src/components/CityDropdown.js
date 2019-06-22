import React, { Component } from 'react';

class CityDropdown extends Component {


  handleChange = (e) => {
    this.props.recieveCityForRequest(e.target.value)
  }

  getOptions(cityArr, currentCity){
    let getCities = cityArr.map((cityName) => {
      return <option
      selected = { currentCity === cityName}
      key = {cityName.toLowerCase()}
      value={cityName}>
      {cityName}
      </option>
    })
    return(
      <select className='citySelect' onChange={this.handleChange}>
        <option hidden disabled selected value> Select a City </option>
        {getCities}
      </select>
    )
  }


  render() {
    const city = [
      'BANGLORE',
      'CHENNAI',
      'KOLKATA',
      'THIRUVANANTHAPURAM',
      'HYDERABAD'
    ]
    return (this.getOptions(city,this.props.currentCity))
  }
}

export default CityDropdown;
