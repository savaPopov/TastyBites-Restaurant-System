import React from 'react';
import './DeleteModal.css';

const DeleteModal = ({ isOpen, itemName, itemType, onConfirm, onCancel, isLoading = false }) => {
  if (!isOpen) return null;


  const getModalText = () => {
    switch (itemType) {
      case 'user':
        return {
          title: 'Delete User',
          message: `Are you sure you want to delete user ${itemName}?`,
          warning: 'All user data will be permanently removed.'
        };
      case 'menuItem':
        return {
          title: 'Delete Menu Item',
          message: `Are you sure you want to delete ${itemName}?`,
          warning: 'This action cannot be undone.'
        };
      default:
        return {
          title: 'Delete Item',
          message: `Are you sure you want to delete ${itemName}?`,
          warning: 'This action cannot be undone.'
        };
    }
  }
  const { title, message, warning } = getModalText();

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
        </div>
        <div className="modal-body">
          <p>{message}</p>
          <p className="modal-warning">{warning}</p>
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

export default DeleteModal;