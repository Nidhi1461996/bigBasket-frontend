import React, { Component } from 'react';
import './orderSummary.css';


class OrderSummary extends Component {
  state = {
    final: [],
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
    const final = [];
    const categories = Object.keys(this.props.orderItems);
    for (let i = 0; i < categories.length; i += 1) {
      const orderRow = [];
      const categoryRow = [<th><td>{categories[i]}</td></th>];
      this.props.orderItems[categories[i]].forEach((order) => {
        orderRow.push(<tr>
          <td>{order.title}</td>
          <td>{order.cost}</td>
          <td>{order.quantity}</td>
          <td>Rs.{order.tot}<button onClick={() => this.deleteButtonClick(order.title, categories[i])}>x</button></td>
        </tr>);
      });

      final.push(categoryRow);
      final.push(orderRow);
    }
    this.setState({
      final,
    });
  }

  deleteButtonClick = (title, category) => {
    this.props.deleteElem(title, category);
    const final = [];
    const categories = Object.keys(this.props.orderItems);
    for (let i = 0; i < categories.length; i += 1) {
      const orderRow = [];
      const categoryRow = [<th><td>{categories[i]}</td></th>];
      this.props.orderItems[categories[i]].forEach((order) => {
        orderRow.push(<tr>
          <td>{order.title}</td>
          <td>{order.cost}</td>
          <td>{order.quantity}</td>
          <td>Rs.{order.tot}
            <button onClick={() => this.deleteButtonClick(order.title, categories[i])}>x</button>
          </td>
        </tr>);
      });

      final.push(categoryRow);
      final.push(orderRow);
    }
    this.setState({
      final,
    });
  }

  render() {
    console.log(this.props.orderItems, 'here');
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>ITEM DESCRIPTION</td>
              <td>UNIT PRICE</td>
              <td>QUANTITY</td>
              <td>SUBTOTAL</td>
            </tr>
          </thead>
          {this.state.final}
          <tbody />
        </table>
      </div>

    );
  }
}

export default OrderSummary;
