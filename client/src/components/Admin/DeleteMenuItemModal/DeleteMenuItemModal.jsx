import React from 'react';
import './DeleteMenuItemModal.css';

const DeleteMenuItemModal = ({ isOpen, itemName, onConfirm, onCancel, isLoading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Delete Menu Item</h2>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete <strong>{itemName}</strong>?</p>
          <p className="modal-warning">This action cannot be undone.</p>
        </div>
        <div className="modal-actions">
          <button
            onClick={onCancel}
            className="btn btn-outline btn-default-size"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-hero btn-default-size"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMenuItemModal;