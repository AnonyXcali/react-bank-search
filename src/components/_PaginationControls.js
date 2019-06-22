import React, { Component } from 'react';

class _PaginationControls extends Component {

  state = {
    currentPage : 1,
    max: 0
  }

  generatePageNumbers = (len, pages) => {
    var pageNumbers = 0;
    for (let i = 1; i <= Math.ceil(len/ pages); i++) {
          pageNumbers += 1;
    }
    return pageNumbers;
  }

  handlePageChange = e => {
    let currPage = e.target.value || '1';
    let min = parseInt(e.target.attributes[3].value);
    let max = parseInt(e.target.attributes[4].value);
    if(parseInt(currPage) < min){
      return false;
    }else if(parseInt(currPage) > max){
      return false;
    }
    this.setState({
      currentPage : [e.target.name] = currPage
    })
    this.props.sendPageValue(currPage);

  }

  render() {
    return (
      <div className='_paginationControls'>
        <input
        className='pageInput'
        onChange={this.handlePageChange}
        name='currentPage'
        value={this.state.currentPage}
        type='number'
        min='1'
        max={this.generatePageNumbers(this.props.totalLength, this.props.currentPaginationValue)}/>
        /
        <p className='maxPage'>{this.generatePageNumbers(this.props.totalLength, this.props.currentPaginationValue)}</p>
      </div>
    );
  }
}

export default _PaginationControls;
