import React, { Component } from 'react';
import axios from 'axios';
import './pastorder.css';


class Orders extends Component {
  state = {
    orders: [],
    final: [],
  };
  componentDidMount() {
    axios({
      method: 'GET',
      url: '/order',
    }).then((data) => {
      this.setState({
        orders: data.data,
      });
      return data;
    }).then((data) => {
      console.log(this.state.orders, 'this is here');
      const final = [];
      for (let i = 0; i < data.data.length; i += 1) {
        const heading = [
          <tr className="table-title"><td>ORDER</td><td>ITEMS</td><td>DATE</td><td>AMOUNT</td></tr>,
        ];
        heading.push(<tr>
          <td>{this.state.orders[i].id}</td>
          <td>{this.state.orders[i].orderDetails.length}</td>
          <td>{new Date(this.state.orders[i].updatedAt).getDate()}/
            {new Date(this.state.orders[i].updatedAt).getMonth() + 1}/
            {new Date(this.state.orders[i].updatedAt).getFullYear()}
          </td>
          <td>AMOUNT</td>
                     </tr>);
        const body = [];
        body.push(<tr className="item-detail"><td>ITEM DESCRIPTION</td><td>QUANTITY</td><td>DATE</td><td>SUBTOTAL</td></tr>);
        this.state.orders[i].orderDetails.forEach((order) => {
          body.push(<tr><td>{order.itemId}</td>
            <td>{order.quantity}</td>
            <td>{order.updatedAt}</td>
            <td>{order.subTotal}</td>
                    </tr>);
        });
        final.push(heading);
        final.push(body);
      }
      this.setState({
        final,
      });
    });
  }


  render() {
    return (
      <div>
        <table >
          {this.state.final}
        </table>
      </div>

    );
  }
}

export default Orders;
