import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js'; 
import ConfirmationPopup from './ConfirmationPopup.js';


import React from 'react';
 
function App() {
    
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [deleteSelectedCard, setDeleteSelectedCard] = React.useState(null);
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
        api.getCardList()
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

    const handleDeleteClick =(card) => {
      setDeleteSelectedCard(card);
      setIsConfirmationPopupOpen(true);
    };
 
    const handleCloseAllPopup = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmationPopupOpen(false);
        setSelectedCard(null);
        setDeleteSelectedCard(null);
    };
 
    function handleUpdateUser({ name, about }) {
      return new Promise((resolve, reject) => {
          api.setUserInfo({ name, about })
            .then((updatedUser) => {
              setCurrentUser(updatedUser);
              resolve();
              handleCloseAllPopup();
            })
            .catch((error) => {
              console.log('Ошибка при обновлении данных пользователя:', error);
              reject(error); // Завершаем промис с ошибкой
            });
          });
      }
 
      const handleUpdateAvatar = ({ avatar }) => {
        return new Promise((resolve, reject) => {
          api.setUserAvatar({ avatar })
            .then((updatedUser) => {
              setCurrentUser(updatedUser);
              resolve();
              handleCloseAllPopup();
            })
            .catch((error) => {
              console.log('Ошибка при обновлении аватара:', error);
              reject(error); // Завершаем промис с ошибкой
            });
          });
      };

      function handleCardDelete(card) {
        return new Promise((resolve, reject) => {
          api.removeCardFromServer(card._id)
            .then(() => {
              setCards((state) => state.filter((c) => c._id !== card._id));
              resolve(); // Успешно завершаем промис
              handleCloseAllPopup();
            })
            .catch((error) => {
              console.log('Ошибка удаления карточки:', error);
              reject(error); // Завершаем промис с ошибкой
            });
        });
    }

      const handleAddPlaceSubmit = ({ name, link }) => {
        return new Promise((resolve, reject) => {
          api.addNewCard({ name, link })
            .then((newCard) => {
              setCards([newCard, ...cards]);
              resolve(); // Успешно завершаем промис
              handleCloseAllPopup();
            })
            .catch((error) => {
              console.log('Ошибка при добавлении карточки:', error);
              reject(error); // Завершаем промис с ошибкой
            });
          }); 
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
                        onCardDeleteButtonClick={handleDeleteClick}
                        />
                        <Footer />

                        <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={handleCloseAllPopup}
                        onUpdateUser={handleUpdateUser}
                        />
                        <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={handleCloseAllPopup}
                        onSubmit={handleAddPlaceSubmit}/>

                        <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={handleCloseAllPopup}
                        onUpdateAvatar={handleUpdateAvatar}/> 

                        <ConfirmationPopup
                        card={deleteSelectedCard}
                        isOpen={isConfirmationPopupOpen}
                        onClose={handleCloseAllPopup}
                        onDeleteCard={handleCardDelete}/>

                        <ImagePopup
                        card={selectedCard}
                        onClose={handleCloseAllPopup}
                        />
                    </div>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}
 
export default App;