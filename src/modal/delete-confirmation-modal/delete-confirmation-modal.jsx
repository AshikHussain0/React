import './delete-confirmation-modal.css'; // Import CSS for modal styling

// eslint-disable-next-line react/prop-types
const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this item?</p>
          <div className="modal-buttons">
            <button onClick={onDelete}>Delete</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
