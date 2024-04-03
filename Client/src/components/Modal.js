import React, { useState } from 'react';
import { useNoteContext } from '../configs/NoteContext';
import { IoColorPalette } from 'react-icons/io5';
import { MdDelete } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import { axios } from '../configs/Axios';
import '../styles/Modal.css';

const Modal = ({ note, onClose, children }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showChooseButton, setShowChooseButton] = useState(false);
  const [selectedColor, setSelectedColor] = useState(note.background );
  const [mode, setMode] = useState('view');
  const { setNotes } = useNoteContext();

  const handleColorChange = (e) => {
    setShowChooseButton(true);
    setSelectedColor(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/notes/${note._id}`, { ...note, background: selectedColor });
      const response = await axios.get('/notes');
      setNotes(response.data.data);
      onClose();
    } catch (error) {
      console.error('failed:', error.response.data.error_message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/notes/${note._id}`);
      const response = await axios.get('/notes');
      setNotes(response.data.data);
      onClose();
    } catch (error) {
      console.error('failed:', error.response.data.error_message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ backgroundColor: showColorPicker ? selectedColor : (note.background ? note.background : '#ffffff') }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        {mode === 'view' ? (
          <>
            {children}
            <div className="modal-options">
              <IoColorPalette className="modal-options-icons" onClick={() => setShowColorPicker(true)} />
              {showColorPicker && <input type="color" value={selectedColor} onChange={handleColorChange} />}
              {showChooseButton && <button onClick={handleUpdate}>Choose</button>}
              <FaEdit className="modal-options-icons" onClick={() => setMode('edit')} />
              <MdDelete onClick={handleDelete} />
            </div>
          </>
        ) : (
          <div className="form">
            <input
              type="text"
              defaultValue={note.title}
              onChange={(e) => {
                note.title = e.target.value;
              }}
            />
            <textarea
              defaultValue={note.description}
              rows={10}
              onChange={(e) => {
                note.description = e.target.value;
              }}
            />
            <button className="add-btn" onClick={handleUpdate}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
