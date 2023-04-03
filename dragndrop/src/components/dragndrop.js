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

const MultiLevelCardSortingTool = () => {
    const [categories, setCategories] = useState([
        {
            title: "Home",
            cards: [{ id: "h1", title: "Buy milk" }, { id: "h2", title: "Take out the trash" }],
            subcategories: null,
        },
        {
            title: "Work",
            cards: [{ id: "w1", title: "Send email to client" }],
            subcategories: [
                {
                    title: "Design",
                    cards: [{ id: "w2", title: "Create wireframes" }],
                    subcategories: null,
                },
                {
                    title: "Development",
                    cards: [{ id: "w3", title: "Implement login feature" }],
                    subcategories: null,
                },
                {
                    title: "Testing",
                    cards: [{ id: "w4", title: "Write test cases" }],
                    subcategories: null,
                },
            ],
        },
        {
            title: "Personal",
            cards: [{ id: "p1", title: "Call mom" }],
            subcategories: null,
        },
    ]);

    function handleCardDrop(cardId, categoryTitle) {
        const newCategories = [...categories];
        const targetCategory = newCategories.find((category) => category.title === categoryTitle);
        const targetCard = targetCategory.cards.find((card) => card.id === cardId);
        targetCategory.cards = targetCategory.cards.filter((card) => card.id !== cardId);
        setCategories(newCategories.map((category) => {
            if (category.title === categoryTitle) {
                return {
                    ...category,
                    cards: [...category.cards],
                };
            }
            if (category.subcategories) {
                return {
                    ...category,
                    subcategories: category.subcategories.map((subcategory) => ({
                        ...subcategory,
                        cards: [...subcategory.cards],
                    })),
                };
            }
            return category;
        }));
        targetCard.category = categoryTitle;
        setCategories(newCategories.map((category) => {
            if (category.title === categoryTitle) {
                return {
                    ...category,
                    cards: [...category.cards, targetCard],
                };
            }
            if (category.subcategories) {
                return {
                    ...category,
                    subcategories: category.subcategories.map((subcategory) => ({
                        ...subcategory,
                        cards: subcategory.title === targetCard.subcategory ? [...subcategory.cards, targetCard] : [...subcategory.cards],
                    })),
                };
            }
            return category;
        }));
    }

    function handleCategoryDrop(sourceTitle, targetTitle) {
        const newCategories = [...categories];
        const sourceCategory = newCategories.find((category) => category.title === sourceTitle);
        const sourceIndex = newCategories.findIndex((category) => category.title === sourceTitle);
        const targetIndex = newCategories.findIndex((category) => category.title === targetTitle);
        const targetCategory = newCategories.find((category) => category.title === targetTitle);
        newCategories.splice(sourceIndex, 1);
        const updatedSourceCategory = {
            ...sourceCategory,
            cards: [...sourceCategory.cards],
        };
        if (sourceCategory.subcategories) {
            updatedSourceCategory.subcategories = sourceCategory.subcategories.map((subcategory) => ({
                ...subcategory,
                cards: [...subcategory.cards],
            }));
        }
        if (targetCategory.subcategories) {
            setCategories(newCategories.slice(0, targetIndex).concat([
                {
                    ...targetCategory,
                    subcategories: targetCategory.subcategories.map((subcategory) => ({
                        ...subcategory,
                        cards: [...subcategory.cards],
                    }))
                },
                ...newCategories.slice(targetIndex),
            ]));
        } else {
            setCategories(newCategories.slice(0, targetIndex).concat([
                targetCategory,
                {
                    ...updatedSourceCategory,
                    subcategory: null,
                },
                ...newCategories.slice(targetIndex),
            ]));
        }
    }

    return (
        <div className="App">
            {categories.map((category) => (
                <div key={category.title} className="category">
                    <h2>{category.title}</h2>
                    <div className="cards-container">
                        {category.cards.map((card) => (
                            // <Card
                            //     key={card.id}
                            //     id={card.id}
                            //     title={card.title}
                            //     category={category.title}
                            //     onDrop={handleCardDrop}
                            // />
                            <div
                                key={card.id}
                                className="card"
                                draggable
                                onDragStart={e => e.dataTransfer.setData('cardId', card.id.toString())}
                                // onDragEnd={() => setDraggedCategory(null)}
                                onDrop={e => handleCardDrop(e, category.id)}
                            >
                                {card.title}
                            </div>
                        ))}
                    </div>
                    {category.subcategories &&
                        category.subcategories.map((subcategory) => (
                            <div key={subcategory.title} className="subcategory">
                                <h3>{subcategory.title}</h3>
                                <div className="cards-container">
                                    {subcategory.cards.map((card) => (
                                        // <Card
                                        //     key={card.id}
                                        //     id={card.id}
                                        //     title={card.title}
                                        //     category={category.title}
                                        //     subcategory={subcategory.title}
                                        //     onDrop={handleCardDrop}
                                        // />
                                        <div
                                            key={card.id}
                                            className="card"
                                            draggable
                                            onDragStart={e => e.dataTransfer.setData('cardId', card.id.toString())}
                                            // onDragEnd={() => setDraggedCategory(null)}
                                            onDrop={e => handleCardDrop(e, category.id)}
                                        >
                                            {card.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            ))}
            {/* <div className="category add-category">
                <h2>Add a category</h2>
                <CategoryForm onAdd={(title) => setCategories([...categories, { title, cards: [], subcategories: null }])} />
            </div> */}
        </div>
    );
};

export default MultiLevelCardSortingTool;