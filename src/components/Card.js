import React from 'react';

function Card({ card, onCardClick }) {
    const handleClick = () => {
      onCardClick(card);
    };
    
    return (
        <div className="elements__element" key={card._id}>
            <button type="button" className="elements__delete elements__delete_none" aria-label="delete"></button>
            <img src={card.link} alt={card.name} onClick={handleClick} className="elements__item" style={{ backgroundImage: `url(${card.link})` }}/>
            <div className="elements__info">
              <h2 className="elements__title" id="#element-title">{card.name}</h2>
              <div className="elements__container">  
                <button type="button" className="elements__heart" aria-label="like"></button>
                <div className="elements__counter">{card.likes.length}</div>
              </div>
            </div>
        </div>
    );
}

export default Card;