import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.css';

class Header extends Component {
  setThePage = () => {
    this.props.setPage('orderDetails');
  }
  render() {
    return (
      <div className="HeaderClass" >
        <div onClick={() => this.props.setPage('main')}>E-shopper</div>
        <div> <button onClick={() => this.setThePage()} disabled={this.props.flag}>My basket</button> <br />{this.props.number} items  </div>
      </div>

    );
  }
}
const mapStatesToProps = state => ({
  number: state.basket,

});
export default connect(mapStatesToProps, null)(Header);
