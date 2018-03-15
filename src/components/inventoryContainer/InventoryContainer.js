import React, { Component } from 'react';
import './inventoryContainer.css';
import ItemCardsContainer from '../itemCardsContainer/itemCardsContainer';

class InventoryContainer extends Component {
  render() {
    const itemCardsContainer = this.props.categories.map((category, index) => (<ItemCardsContainer
      key={index}
      category={category}
      inventory={this.props.inventory[category]}
      setOrderItems={this.props.setOrderItems}

    />));
    return (
      <div className="container" >
        {itemCardsContainer}
      </div>

    );
  }
}

export default InventoryContainer;
