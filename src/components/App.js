import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';

import React from 'react';

function App() {
    
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState('');
    const [cards, setCards] = React.useState([]);
    
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(`Ошибка обновления лайка: ${err}`));;
    } 

    function handleCardDelete(card) {
        api.removeCardFromServer(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
    }

    React.useEffect(() => {
        api.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((error) => {
                console.log('Ошибка при получении данных пользователя:', error);
            });
    }, []);
    
    React.useEffect(() => {
        api.getInitialCards()
          .then((cardsData) => {
            setCards(cardsData);
          })
          .catch((error) => {
            console.log('Ошибка при получении данных карточек:', error);
          });
      }, []);

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleCloseAllPopup = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="body">
                    <div className="page">
                        <Header />
                        <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        cards={cards}
                        onCardDelete={handleCardDelete}
                        />
                        <Footer />
                        <PopupWithForm title="Редактировать профиль" name="edit" value="Сохранить" isOpen={isEditProfilePopupOpen} onClose={handleCloseAllPopup}>
                            <input type="text" id="name" name="name" placeholder="Имя" className="popup__input popup__input_text_name" minLength="2" maxLength="40" required />
                            <span className="popup__error" id="name-error"></span>
                            <input type="text" id="about" name="about" placeholder="О себе" className="popup__input popup__input_text_about" minLength="2" maxLength="200" required />
                            <span className="popup__error" id="about-error"></span>
                        </PopupWithForm>
                        <PopupWithForm title="Новое место" name="add" value="Создать" isOpen={isAddPlacePopupOpen} onClose={handleCloseAllPopup}>
                            <input type="text" id="place" name="name" placeholder="Название" className="popup__input" required minLength="2" maxLength="30" />
                            <span className="popup__error" id="place-error"></span>
                            <input type="url" id="url" name="link" placeholder="Ссылка на картинку" className="popup__input" required />
                            <span className="popup__error"></span>
                        </PopupWithForm>
                        <PopupWithForm title="Обновить аватар" name="avatar" value="Создать" isOpen={isEditAvatarPopupOpen} onClose={handleCloseAllPopup}>
                            <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__input" required />
                            <span className="popup__error"></span>
                        </PopupWithForm> 
                        <PopupWithForm title="Вы уверены?" name="delete" value="Да" onClose={handleCloseAllPopup} />
                        <ImagePopup card={selectedCard} onClose={handleCloseAllPopup} />
                    </div>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
