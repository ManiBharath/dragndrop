import React, { useState } from 'react';

const cardData = [
  { id: 1, title: 'Card 1', category: 1 },
  { id: 2, title: 'Card 2', category: 2 },
  { id: 3, title: 'Card 3', category: 3 },
  { id: 4, title: 'Card 4', category: 1 },
  { id: 5, title: 'Card 5', category: 2 },
  { id: 6, title: 'Card 6', category: 3 },
  { id: 7, title: 'Card 7', category: 1 },
];

const categories = [
  { id: 1, title: 'Category 1' },
  { id: 2, title: 'Category 2' },
  { id: 3, title: 'Category 3' },
];

const SingleLevelCardSortingTool = () => {
  const [cards, setCards] = useState(cardData);
  const [draggedCategory, setDraggedCategory] = useState(null);

  const handleCardDrop = (event, categoryId) => {
    const cardId = event.dataTransfer.getData('cardId');
    const updatedCards = cards.map(card => {
      if (card.id.toString() === cardId) {
        return { ...card, category: categoryId };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleCategoryDrop = (event, targetCategoryId) => {
    const sourceCategoryId = event.dataTransfer.getData('categoryId');
    if (sourceCategoryId !== targetCategoryId) {
      const updatedCards = cards.map(card => {
        if (card.category === sourceCategoryId) {
          return { ...card, category: targetCategoryId };
        }
        return card;
      });
      setCards(updatedCards);
    }
  };

  return (
    <div>
      <h2>Multi-Level Card Sorting Tool</h2>
      <div className="categories">
        {categories.map(category => (
          <div
            key={category.id}
            className="category"
            draggable
            onDragStart={e => setDraggedCategory(category.id)}
            onDragEnd={() => setDraggedCategory(null)}
            onDrop={e => handleCategoryDrop(e, category.id)}
            style={{
              opacity: draggedCategory === category.id ? 0.5 : 1,
              backgroundColor: draggedCategory === category.id ? '#f0f0f0' : 'white'
            }}
          >
            <h3>{category.title}</h3>
            <div className="cards">
              {cards.filter(card => card.category === category.id).map(card => (
                <div
                  key={card.id}
                  className="card"
                  draggable
                  onDragStart={e => e.dataTransfer.setData('cardId', card.id.toString())}
                  onDragEnd={() => setDraggedCategory(null)}
                  onDrop={e => handleCardDrop(e, category.id)}
                >
                  {card.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleLevelCardSortingTool;