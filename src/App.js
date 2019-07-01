import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/custom-tooltip.css'
import './styles/pagination.css'
import Search from './components/Search.js'
import Results from './components/Results.js'
import CityDropdown from './components/CityDropdown.js'
import Header from './components/Header.js'
import FavouriteBanks from './components/FavouriteBanks'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  state = {
    fetchState : false,
    currentCity : '',
    bankData: [],
    filteredBankData: [],
    favouriteBankData: [],
    keyWord: '',
    isPaginated: false,
    paginationValue: 5,
    currentPage: 1,
    size: 0
  }

  sendPageToRoot = page => {
    page = page || 1
    this.sliceDataForPagination(this.state.paginationValue, page);
  }

  recieveChange = keyword => {
    this.setState({
      keyWord: keyword.toLowerCase()
    })
  }

  toggleFavouriteObject = bankObj => {
    let bankID = bankObj.ifsc
    let flag = false;
    let isAlreadyFavourited = this.state.bankData.map(key=>{
      if(key.ifsc === bankID){
        flag =  key.isFavourite;
      }
    })
    if(flag){
      this.setState({
        favouriteBankData : this.state.favouriteBankData.filter(key => {
          if(key.ifsc !== bankID){
            return key;
          }
        }),
        filteredBankData: this.state.filteredBankData.map(key=> {
          if(key.ifsc === bankID){
            key.isFavourite = false
          }
          return key;
        }),
        bankData: this.state.bankData.map(key=> {
          if(key.ifsc === bankID){
            key.isFavourite = false
          }
          return key;
        })
      })
    }else{
      this.setState({
        favouriteBankData : [...this.state.favouriteBankData, bankObj],
        filteredBankData: this.state.filteredBankData.map(key=> {
          if(key.ifsc === bankID){
            key.isFavourite = true
          }
          return key;
        }),
        bankData: this.state.bankData.map(key=> {
          if(key.ifsc === bankID){
            key.isFavourite = true
          }
          return key;
        })
      })
    }
  }

  recieveCityForRequest = city => {
    this.setState({
      currentPage : 1,
      currentCity: city
    })
  }

  sliceDataForPagination = (pagVal, page, arr) => {
    let indexOfLastKey = page * pagVal;
    let indexOfFirstKey= indexOfLastKey - pagVal;
    let result;
    if(indexOfFirstKey > this.state.size){
      indexOfLastKey = pagVal
      indexOfFirstKey = 0
      page =  1
    }
    this.setState({
      paginationValue: pagVal,
      currentPage: page,
      filteredBankData: arr ? arr.slice(indexOfFirstKey, indexOfLastKey) : this.state.bankData.slice(indexOfFirstKey, indexOfLastKey)
    })
  }

  recievePaginationReq = val => {
    this.sliceDataForPagination(val, 1);
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.currentCity !== this.state.currentCity){
      this.fetchCityData(this.state.currentCity);
    }
    if(this.state.keyWord !== prevState.keyWord){
      this.filterBankData(this.state.keyWord, this.state.bankData);
    }

    localStorage.setItem(this.state.currentCity, JSON.stringify(this.state.bankData));
    localStorage.setItem('favouriteBankData', JSON.stringify(this.state.favouriteBankData))
    localStorage.setItem('currentCity', this.state.currentCity);

  }

  componentDidMount(){
    this.setState({
      favouriteBankData: JSON.parse(localStorage.getItem('favouriteBankData')) || []
    })
  }

  filterBankData(keyWord, data){
    let filteredData = data.filter( key => {
      if(key.ifsc.toLowerCase().indexOf(keyWord)      >= 0  ||
         key.address.toLowerCase().indexOf(keyWord)   >= 0  ||
         key.city.toLowerCase().indexOf(keyWord)      >= 0  ||
         key.district.toLowerCase().indexOf(keyWord)  >= 0  ||
         key.bank_name.toLowerCase().indexOf(keyWord) >= 0  ||
         key.state.toLowerCase().indexOf(keyWord)     >= 0  ||
         key.branch.toLowerCase().indexOf(keyWord)    >= 0
        ){
          return key;
      }
    })
    this.setState({
      size: filteredData.length
    })
    this.sliceDataForPagination(this.state.paginationValue, 1, filteredData)
  }

  fetchCityData = (city) => {
    let bankData = [];
    if(city){
      let cityToBeFetched = city.toUpperCase();
      let url = 'https://vast-shore-74260.herokuapp.com/banks?city='+cityToBeFetched
      if(localStorage.getItem(city)){
        this.setState({
          bankData : JSON.parse(localStorage.getItem(city)) ,
          size: JSON.parse(localStorage.getItem(city)).length
        })
        this.sliceDataForPagination(this.state.paginationValue, this.state.currentPage, JSON.parse(localStorage.getItem(city)))
      }else{
        let fetchedData = fetch(url).
        then( res => {
          return res.json()
        }).then(result => {

          for(let i=0; i<result.length;i++){
            result[0].isFavourite = false;
          }

          localStorage.setItem(city, JSON.stringify(result));
          this.setState({
            bankData : result,
            size: result.length
          })

          this.sliceDataForPagination(this.state.paginationValue, this.state.currentPage, result)
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
  }
  render() {
    return (
      <Router>
        <Route path="/" render={
            () => {
              return(<div>
                <Header data={this.state.favouriteBankData}/>
                <div className='userInput'>
                  <CityDropdown
                    currentCity = {this.state.currentCity}
                    recieveCityForRequest={(city) => {this.recieveCityForRequest(city)}}
                    />
                  <Search
                    recieveChange={(data) => {this.recieveChange(data)}}
                    />
                </div>
                <Results
                  currentPaginationValue={this.state.paginationValue}
                  currentPage={this.state.currentPage}
                  isPaginated={this.state.isPaginated}
                  sendPageToRoot={(page) => {this.sendPageToRoot(page)}}
                  recievePaginationReq={(data) => {this.recievePaginationReq(data)}}
                  currentCity={this.state.currentCity}
                  totalLength={this.state.size}
                  toggleFavouriteObject={(bank) => {this.toggleFavouriteObject(bank)}}
                  data={this.state.filteredBankData}/>
              </div>
            )
            }
          } exact>
        </Route>
        <Route path='/favourites' exact render={(props) => <FavouriteBanks {...props}/>}/>
      </Router>
    );
  }
}

export default App;
