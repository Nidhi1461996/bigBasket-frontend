import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/header/Header';
import InventoryContainer from './components/inventoryContainer/InventoryContainer';
import OrderSummary from './components/orderSummary/OrderSummary';
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
    console.log(title, category);
    let ind = -1;
    const orderItems1 = this.state.orderItems;
    const neworderitems = this.state.orderItems[category];
    for (let i = 0; i < neworderitems.length; i += 1) {
      if (neworderitems[i].title === title) {
        ind = i;
      }
    }
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
          <Header setPage={this.setPage} />
          <InventoryContainer
            inventory={this.state.inventory}
            categories={this.state.categories}
            setOrderItems={this.setOrderItems}

          />

        </div>
      );
    }

    return (
      <div className="App">
        <Header setPage={this.setPage} />
        <OrderSummary
          orderItems={this.state.orderItems}
          deleteElem={this.deleteElem}
        />
      </div>
    );
  }
}

export default App;
