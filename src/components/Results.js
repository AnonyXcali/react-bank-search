import React, { Component } from 'react';
import _PaginationControls from './_PaginationControls.js'


class Results extends Component {

  state: {
    currentPage: 1
  }

  sendPageValue = page => {
    this.props.sendPageToRoot(page);
  }

  manipulatePageViaArrows = (page, maxLen, buttonEle) => {
    this.props.manipulatePageViaArrowsToRoot(page, maxLen, buttonEle);
  }

  setPaginationValue(e){
    let pagiEles = document.getElementsByClassName('pgntnBtns');
    for(let elem in pagiEles){
      if(typeof pagiEles[elem] === 'object'){
        pagiEles[elem].classList.remove('underlineClass');
      }
    }
    e.target.classList.add('underlineClass');
    let paginVal = e.target.attributes[1].value;
    if(paginVal > 5 && paginVal < 10) {
      paginVal = 10
    }
    this.props.recievePaginationReq(paginVal)
  }

  toggleFavourite = (bank) => {
    this.props.toggleFavouriteObject(bank);
  }

  renderData = (data, currentCity, isPaginated) => {
    let getTables = data.map( (key, value) => {
      value +=1;
      return (
            <tr key={value}>
                <td key={'val_'+value}>{value}</td>
                <td key={'name_'+value}>{key.bank_name}</td>
                <td key={'ifsc_'+value}>
                  {key.ifsc}
                  <button onClick={this.toggleFavourite.bind(this, key)} className="favouriteBtn tooltip-toggle" data-tooltip={key.isFavourite ? 'Favourite!' : 'Favourite?'}><i className={key.isFavourite ? 'isFavourite favIcon fas fa-star' : 'favIcon fas fa-star'}></i></button>
                </td>
            </tr>
          )
    })

    return(
    <div className='results'>
      <p className='showingResultsFor'>Showing results for - <span className='currentCity'><strong>{currentCity}</strong></span></p>
      <div className='pagination'>
      <p className='paginationText'>Page Size : </p>
      <button className='five pgntnBtns underlineClass' data-val={5} onClick={this.setPaginationValue.bind(this)}>5</button>
      <button className='ten pgntnBtns' data-val={10} onClick={this.setPaginationValue.bind(this)}>10</button>
      <button className='twenty pgntnBtns' data-val={20} onClick={this.setPaginationValue.bind(this)}>20</button>
      ...
      <button className='showAll pgntnBtns' data-val={this.props.totalLength} onClick={this.setPaginationValue.bind(this)}>All</button>
      </div>
      <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>Bank Name</th>
              <th>IFSC</th>
            </tr>
          {getTables}
          </tbody>
      </table>
      <_PaginationControls
        sendPageValue={(page) => {this.sendPageValue(page)}}
        totalLength = {this.props.totalLength}
        currentPaginationValue={this.props.currentPaginationValue}
        currentPage={this.props.currentPage}
        />
    </div>
    )
  }
  //sendPageValue
  render() {
    if(this.props.data && this.props.data.length > 0){
        return (this.renderData(this.props.data, this.props.currentCity, this.props.isPaginated))
    }else{
      return(
        <div className='noData'>
          <i className="fas fa-search-dollar"></i>
        </div>
        )
      }
  }
}

export default Results;
