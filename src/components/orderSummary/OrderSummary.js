import React, { Component } from 'react';
import axios from 'axios';
import './orderSummary.css';


class OrderSummary extends Component {
  state = {
    final: [],
    tot: 0,
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     final: [],
  //   };
  //   this.doNoth();
  // }

  // doNoth = () => {
  //   const final = [];
  //   const categories = Object.keys(this.props.orderItems);
  //   for (let i = 0; i < categories.length; i += 1) {
  //     const orderRow = [];
  //     const categoryRow = [<th><td>{categories[i]}</td></th>];
  //     this.props.orderItems[categories[i]].forEach((order) => {
  //       orderRow.push(<tr>
  //         <td>{order.title}</td>
  //         <td>{order.cost}</td>
  //         <td>{order.quantity}</td>
  //         <td>Rs.{order.tot}<button onClick={() => { this.props.deleteElem(order.title, categories[i]); }}>x</button></td>
  //                     </tr>);
  //     });

  //     final.push(categoryRow);
  //     final.push(orderRow);
  //     console.log(final);
  //   }
  //   this.setState({
  //     final,
  //   });
  // }
  componentDidMount() {
    let tot = 0;
    const final = [];
    const categories = Object.keys(this.props.orderItems);
    for (let i = 0; i < categories.length; i += 1) {
      const orderRow = [];
      const categoryRow = [
        <tr className="sub-heading">
          <td>{categories[i]}</td>
          <td />
          <td />
          <td />
        </tr>];
      this.props.orderItems[categories[i]].forEach((order) => {
        tot += order.tot;
        orderRow.push(<tr>
          <td>{order.title}</td>
          <td>{order.cost}</td>
          <td>{order.quantity}</td>
          <td>Rs.{order.tot}<button onClick={() => this.deleteButtonClick(order.title, categories[i])}>x</button></td>
                      </tr >);
      });

      final.push(categoryRow);
      final.push(orderRow);
    }
    this.setState({
      final,
      tot,
    });
  }

  deleteButtonClick = (title, category) => {
    let tot = 0;
    this.props.deleteElem(title, category);
    const final = [];
    const categories = Object.keys(this.props.orderItems);
    for (let i = 0; i < categories.length; i += 1) {
      const orderRow = [];
      const categoryRow = [<tr className="sub-heading">
        <td>{categories[i]}</td>
        <td />
        <td />
        <td />
                           </tr>];
      this.props.orderItems[categories[i]].forEach((order) => {
        tot += order.tot;
        orderRow.push(<tr>
          <td>{order.title}</td>
          <td>{order.cost}</td>
          <td>{order.quantity}</td>
          <td>Rs.{order.tot}
            <button onClick={() => this.deleteButtonClick(order.title, categories[i])}>x</button>
          </td>
                      </tr >);
      });

      final.push(categoryRow);
      final.push(orderRow);
    }
    this.setState({
      final,
      tot,
    });
  }
  checkout = () => {
    axios({
      method: 'POST',
      url: '/checkout',
      data: {
        orderDetails: Object.values(this.props.orderItems),
      },
    }).then(() => { this.props.setPage('pastOrders'); });
  }
  render() {
    console.log(Object.values(this.props.orderItems), 'here');
    return (
      <div>
        <table>

          <tr>
            <td>ITEM DESCRIPTION</td>
            <td>UNIT PRICE</td>
            <td>QUANTITY</td>
            <td>SUBTOTAL</td>
          </tr>

          {this.state.final}
          <tbody />
        </table>
        <div className="checkout">
          <div className="total">
            TOTAL :   {this.state.tot}
          </div>
          <button className="checkout-button" onClick={() => this.checkout()}>CHECKOUT -></button>

        </div>
      </div>

    );
  }
}

export default OrderSummary;
