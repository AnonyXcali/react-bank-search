import React, { Component } from 'react';

class PaginationControls extends Component {

  state : {
    pageNumberPagination : 5
  }

  slicePageNumbersForPagination = pageNumbers => {
    // const indexOfLastKey = page * pagVal;
    // const indexOfFirstKey= indexOfLastKey - pagVal;
  }

  generatePageNumbers = (len, pages) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(len/ pages); i++) {
          pageNumbers.push(i);
    }
    return pageNumbers.map(number => {
            return (
                <button
                  className={number === 1 ? 'underlineClass pageNumber' : 'pageNumber'}
                  key={number}
                  id={number}
                  data-key={number}
                  onClick={this.handleClick}>
                  {number}
                </button>
            );
      });
  }

  handleClick = e => {
    let pageNumEle = document.getElementsByClassName('pageNumber');
    for(let elem in pageNumEle){
      if(typeof pageNumEle[elem] === 'object'){
        pageNumEle[elem].classList.remove('underlineClass');
      }
    }
    e.target.classList.add('underlineClass');
    this.props.sendPageValue(e.target.attributes[2].value);
  }

  manipulatePage = (dir) => {
    let buttonEle = document.getElementsByClassName('pageNumber');
    this.props.manipulatePageViaArrows(dir, buttonEle.length, buttonEle);
  }

  render() {
    if(this.props.totalLength && this.props.currentPaginationValue){
        return (
          <div className='pageNumbers'>
           <button onClick={this.manipulatePage.bind(this, 'left')}>
             <i className='fas fa-arrow-left'></i>
           </button>
          {this.generatePageNumbers(this.props.totalLength, this.props.currentPaginationValue)}
            <button onClick={this.manipulatePage.bind(this, 'right')}>
              <i className='fas fa-arrow-right'></i>
            </button>
          </div>
          )
    }else{
      return null
      }
  }
}

export default PaginationControls;
