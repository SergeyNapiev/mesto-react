import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

import React from 'react';

function App() {
    
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

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
        setIsImagePopupOpen(true);
    };

    const handleCloseAllPopup = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard(null);
    };

    return (
        <div className="App">
            <div className="body">
                <div className="page">
                    <Header />
                    <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    />
                    <Footer />
                    <PopupWithForm title="Редактировать профиль" name="edit" isOpen={isEditProfilePopupOpen} onClose={handleCloseAllPopup}>
                        <input type="text" id="name" name="name" placeholder="Имя" className="popup__input popup__input_text_name" minLength="2" maxLength="40" required />
                        <span className="popup__error" id="name-error"></span>
                        <input type="text" id="about" name="about" placeholder="О себе" className="popup__input popup__input_text_about" minLength="2" maxLength="200" required />
                        <span className="popup__error" id="about-error"></span>
                    </PopupWithForm>
                    <PopupWithForm title="Новое место" name="add" isOpen={isAddPlacePopupOpen} onClose={handleCloseAllPopup}>
                        <input type="text" id="place" name="name" placeholder="Название" className="popup__input" required minLength="2" maxLength="30" />
                        <span className="popup__error" id="place-error"></span>
                        <input type="url" id="url" name="link" placeholder="Ссылка на картинку" className="popup__input" required />
                        <span className="popup__error"></span>
                    </PopupWithForm>
                    <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={handleCloseAllPopup}>
                        <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__input" required />
                        <span className="popup__error"></span>
                    </PopupWithForm> 
                    <PopupWithForm title="Вы уверены?" name="delete" onClose={handleCloseAllPopup}>
                    </PopupWithForm>
                    <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={handleCloseAllPopup}/>
                </div>
            </div>
        </div>
    );
}

export default App;
