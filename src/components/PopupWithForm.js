import React from 'react';

function PopupWithForm({ title, name, isOpen, onClose, children }) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} id={name}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} aria-label="Close" ></button>
        <h2 className="popup__heading">{title}</h2>
        <form className={`popup__form popup__form_${name}`} name={name} noValidate>
          {children}
          <button type="submit" className="popup__button" aria-label="save">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;