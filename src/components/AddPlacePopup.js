import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onSubmit }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [isAdding, setIsAdnging] = React.useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAdnging(true);
    onSubmit({ name, link })
    .finally(() => setIsAdnging(false));
  };

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  return (
    <PopupWithForm title="Новое место" name="add" value={isAdding ? 'Добавление...' : 'Создать'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type="text" className="popup__input" placeholder="Название" required minLength="2" maxLength="30" value={name} onChange={handleNameChange}/>
      <span className="popup__error" id="place-error"></span>
      <input type="url" className="popup__input" placeholder="Ссылка на картинку" required value={link} onChange={handleLinkChange}/>
      <span className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;