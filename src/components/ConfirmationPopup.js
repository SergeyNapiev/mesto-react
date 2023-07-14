import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmationPopup({ card, isOpen, onClose, onDeleteCard }) {

    const [isDeleting, setIsDeleting] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsDeleting(true);
        onDeleteCard(card)
        .finally(() => setIsDeleting(false));
      }

    return (
        <PopupWithForm title="Вы уверены?" name="delete" value={isDeleting ? 'Удаление...' : 'Да'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}/>
    );
}

export default ConfirmationPopup;