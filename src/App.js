import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from './components/header/Header';
import InventoryContainer from './components/inventoryContainer/InventoryContainer';
import OrderSummary from './components/orderSummary/OrderSummary';
import Order from './components/pastOrders/PastOrder';
import { dispatchDecrementAction } from './redux/actions';

import './App.css';


class App extends Component {
  state = {
    inventory: {},
    categories: [],
    orderItems: {},
    page: 'main',

  }
  componentWillMount() {
    axios({
      method: 'GET',
      url: '/inventory',
    }).then((result) => {
      const categories = Object.keys(result.data);
      this.setState({
        inventory: result.data,
        categories,
      });
      // console.log(result.data[categories[0]]);
    });
  }

  setPage = (page) => {
    this.setState({
      page,
    });
  }
  setOrderItems = (inputItem, category) => {
    console.log(inputItem, 'input item');
    let flag = 0;
    const orderItems1 = this.state.orderItems;
    if (this.state.orderItems[category] === undefined) {
      orderItems1[category] = [inputItem];
      flag = 1;
    } else {
      const neworderItems = orderItems1[category].map((item) => {
        if (item.title === inputItem.title) {
          flag = 1;
          return inputItem;
        }
        return item;
      });
      if (flag === 0) {
        neworderItems.push(inputItem);
      }
      let ind = -1;

      for (let i = 0; i < neworderItems.length; i += 1) {
        if (neworderItems[i].quantity === 0) {
          ind = i;
        }
      }
      if (ind !== -1) {
        neworderItems.splice(ind, 1);
      }
      if (neworderItems.length === 0) {
        delete orderItems1[category];
      }
      orderItems1[category] = neworderItems;
      this.setState({
        orderItems: orderItems1,

      });
    }
  }
  deleteElem = (title, category) => {
    let ind = -1;
    const orderItems1 = this.state.orderItems;
    const neworderitems = this.state.orderItems[category];
    for (let i = 0; i < neworderitems.length; i += 1) {
      if (neworderitems[i].title === title) {
        ind = i;
      }
    }
    this.props.decrementAction(this.props.basket - neworderitems[ind].quantity);
    if (ind !== -1) {
      neworderitems.splice(ind, 1);
      orderItems1[category] = neworderitems;
    }
    this.setState({
      orderItems: orderItems1,

    });
  }
  render() {
    if (this.state.page === 'main') {
      return (
        <div className="App">
          <Header setPage={this.setPage} flag={false} />
          <InventoryContainer
            inventory={this.state.inventory}
            categories={this.state.categories}
            setOrderItems={this.setOrderItems}

          />

        </div>
      );
    } else if (this.state.page === 'pastOrders') {
      return (
        <div className="App">
          <Header setPage={this.setPage} flag />
          <Order />
        </div>
      );
    }

    return (
      <div className="App">
        <Header setPage={this.setPage} flag />
        <OrderSummary
          orderItems={this.state.orderItems}
          deleteElem={this.deleteElem}
          setPage={this.setPage}
        />
      </div>
    );
  }
}
const mapStatesToProps = state => ({
  basket: state.basket,
});
const mapDispatchToProps = dispatch => ({
  decrementAction: score => dispatch(dispatchDecrementAction(score)),

});
export default connect(mapStatesToProps, mapDispatchToProps)(App);
