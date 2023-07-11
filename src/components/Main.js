import React from 'react';
import Card from './Card.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    // const [userName, setUserName] = React.useState('');
    // const [userDescription, setUserDescription] = React.useState('');
    // const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const currentUser = React.useContext(CurrentUserContext);
  
    React.useEffect(() => {
        api.getInitialCards()
          .then((cardsData) => {
            setCards(cardsData);
          })
          .catch((error) => {
            console.log('Ошибка при получении данных карточек:', error);
          });
      }, []);
      

    // React.useEffect(() => {
    //   // Выполняйте запрос к API при монтировании компонента
    //   api.getUserInfo()
    //     .then((userData) => {
    //       setUserName(userData.name);
    //       setUserDescription(userData.about);
    //       setUserAvatar(userData.avatar);
    //     })
    //     .catch((error) => {
    //       console.log('Ошибка при получении данных пользователя:', error);
    //     });
    // }, []);


  return (
    <main className="content">
        <section className="profile">
            <div className="profile__container">
                <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
                <button type="button" className="profile__set-avatar" onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <div className="profile__naming">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__edit-button" aria-label="edit" onClick={onEditProfile}></button>
                </div>
            </div>
            <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="elements" aria-label="ФОТОЧКИ">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
        </section>
    </main>
  );
}

export default Main;