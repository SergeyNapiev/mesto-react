import React from 'react';
import PopupWithForm from './PopupWithForm.js';
 
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }){
    const avatarRef = React.useRef('');
 
    function handleSubmit(e) {
        e.preventDefault();
    
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }
 
      React.useEffect(() => {
        if (!isOpen) {
          avatarRef.current.value = '';
        }
      }, [isOpen]);
      
      return (
        <PopupWithForm title="Обновить аватар" name="avatar" value="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__input" required ref={avatarRef}/>
            <span className="popup__error"></span>
        </PopupWithForm>
      );
}
 
export default EditAvatarPopup;