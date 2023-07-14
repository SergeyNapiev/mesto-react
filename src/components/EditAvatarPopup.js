import React from 'react';
import PopupWithForm from './PopupWithForm.js';
 
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }){
    const avatarRef = React.useRef('');
    const [isSaving, setIsSaving] = React.useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        setIsSaving(true);
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        })
        .finally(() => setIsSaving(false));
      }
 
      React.useEffect(() => {
        if (!isOpen) {
          avatarRef.current.value = '';
        }
      }, [isOpen]);
      
      return (
        <PopupWithForm title="Обновить аватар" name="avatar" value={isSaving ? 'Сохранение...' : 'Сохранить'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__input" required ref={avatarRef}/>
            <span className="popup__error"></span>
        </PopupWithForm>
      );
}
 
export default EditAvatarPopup;