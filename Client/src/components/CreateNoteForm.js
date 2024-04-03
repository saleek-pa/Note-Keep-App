import React, { useState } from 'react';
import { useNoteContext } from '../configs/NoteContext';
import { axios } from '../configs/Axios';
import Button from './Button';
import '../styles/CreateNoteForm.css';

const CreateNoteForm = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [note, setNote] = useState({ title: '', description: '' });
  const { setNotes } = useNoteContext();

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleClose = () => {
    setInputFocused(false);
  };

  const handleInputChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/notes', note);
      const response = await axios.get('/notes');
      setNotes(response.data.data);
      e.target.reset();
    } catch (error) {
      console.error('failed:', error.response.data.error_message);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" name="title" onFocus={handleInputFocus} onChange={handleInputChange} />
        {inputFocused && (
          <>
            <textarea placeholder="Take a note..." name="description" onChange={handleInputChange} />
            <div className="button-container">
              <Button className="close-btn" onClick={handleClose}>
                Close
              </Button>
              {(note.title || note.description) && (
                <button type="submit" className="add-btn">
                  Add
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateNoteForm;
