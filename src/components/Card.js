import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick }) {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

// Далее в разметке используем переменную для условного рендеринга
// {isOwn && <button className='elements__delete' onClick={handleDeleteClick} />} 

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `elements__heart ${isLiked && 'elements__heart_active'}` 
  );; 

  const handleDeleteClick = () => {
    // Обработчик удаления карточки
  };

    const handleClick = () => {
      onCardClick(card);
    };
    
    return (
        <div className="elements__element" key={card._id}>
            {/* <button type="button" className="elements__delete elements__delete_none" aria-label="delete"></button> */}
            {isOwn && <button className="elements__delete" onClick={handleDeleteClick}></button>}
            <img src={card.link} alt={card.name} onClick={handleClick} className="elements__item" style={{ backgroundImage: `url(${card.link})` }}/>
            <div className="elements__info">
              <h2 className="elements__title" id="#element-title">{card.name}</h2>
              <div className="elements__container">  
                <button type="button" className={cardLikeButtonClassName} aria-label="like"></button>
                <div className="elements__counter">{card.likes.length}</div>
              </div>
            </div>
        </div>
    );
}

export default Card;