import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatchIncrementAction, dispatchDecrementAction } from '../../redux/actions';
import './itemCard.css';

class ItemCardsContainer extends Component {
  state = {
    quantity: 0,
    orderItems: [],
    class: '',
    stock: 'card-summary',
  }
  increment = () => {
    // console.log(this.props.availableQuantity);
    if (this.state.quantity + 1 > this.props.availableQuantity) {
      this.setState({
        quantity: this.props.availableQuantity,
        stock: 'sold-out',
      });
    } else {
      const total = (this.props.cost) * (this.state.quantity + 1);
      const item = {
        itemId: this.props.itemId,
        title: this.props.title,
        description: this.props.description,
        quantity: this.state.quantity + 1,
        cost: this.props.cost,
        tot: total,
      };
      this.props.setOrderItems(item, this.props.category);
      this.setState({
        quantity: this.state.quantity + 1,
      });
      this.props.incrementQuantity(this.props.basket + 1);
      if (this.state.quantity + 1 >= 1) {
        this.setState({
          class: 'highlight',
          stock: 'card-summary',
        });
      }
    }
  }

  decrement = () => {
    if (this.state.quantity - 1 === 0) {
      this.setState({
        class: '',
        stock: 'card-summary',
      });
    }
    if (this.state.quantity === 0) {
      this.setState({
        quantity: 0,
        class: '',
        stock: 'card-summary',
      });
    } else {
      const total = (this.props.cost) * (this.state.quantity - 1);
      const item = {
        itemId: this.props.itemId,
        title: this.props.title,
        description: this.props.description,
        quantity: this.state.quantity - 1,
        cost: this.props.cost,
        tot: total,
      };

      this.props.setOrderItems(item, this.props.category);

      this.setState({
        quantity: this.state.quantity - 1,
        stock: 'card-summary',
      });
      this.props.decrementQuantity(this.props.basket - 1);
    }
  }

  render() {
    return (
      <div>
        <div className="card">
          <span className="card-header">
            <img src={this.props.imageUrl} alt="" />
            <span className="card-title">
              <p>{this.props.brand}</p>
              <h3>{this.props.title}</h3>
            </span>
          </span>
          <span className={this.state.stock}>
            <div>Rs.{this.props.cost}</div>
            <div>{this.props.description}</div>
            <div>
              <div className={this.state.class}><button onClick={() => this.decrement()}>-</button>
                {this.state.quantity}
                <button onClick={() => this.increment()}>+</button>
              </div>
            </div>
          </span>
        </div>
      </div>
    );
  }
}
const mapStatesToProps = state => ({
  basket: state.basket,
});
const mapDispatchToProps = dispatch => ({
  incrementQuantity: quantity => dispatch(dispatchDecrementAction(quantity)),
  decrementQuantity: quantity => dispatch(dispatchIncrementAction(quantity)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(ItemCardsContainer);
