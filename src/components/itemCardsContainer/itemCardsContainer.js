import React, { Component } from 'react';
import './itemCardsContainer.css';
import ItemCard from '../itemCard/ItemCard';

class ItemCardsContainer extends Component {
  render() {
    const itemCards = this.props.inventory.map((itemCard, index) => (<ItemCard
      itemId={itemCard.id}
      title={itemCard.title}
      description={itemCard.description}
      cost={itemCard.cost}
      brand={itemCard.brand}
      imageUrl={itemCard.imageUrl}
      availableQuantity={itemCard.availableQuantity}
      key={index}
      category={this.props.category}
      setOrderItems={this.props.setOrderItems}

    />));
    return (
      <div>
        <h1>{this.props.category}</h1>
        <div className="cards">
          {itemCards}
        </div>
      </div>

    );
  }
}

export default ItemCardsContainer;
