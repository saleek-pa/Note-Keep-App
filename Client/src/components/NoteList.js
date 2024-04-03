import React, { useEffect, useState } from 'react';
import { axios } from '../configs/Axios';
import '../styles/NoteList.css';
import { useNoteContext } from '../configs/NoteContext';
import Modal from './Modal';

const NoteList = ({ view }) => {
  const { notes, setNotes } = useNoteContext();
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/notes');
        setNotes(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (notes.length === 0) {
    return (
      <div className="container">
        <h2 className="mt-50">Notes you add appear here</h2>
      </div>
    );
  }

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  return (
    <div className="container">
      <div className={`note-list ${view}`}>
        {notes?.map((note) => (
          <div
            key={note._id}
            className="note-card"
            style={{ backgroundColor: note.background, width: view === 'grid' ? '200px' : '400px' }}
            onClick={() => handleNoteClick(note)}
          >
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
      {selectedNote && (
        <Modal note={selectedNote} onClose={handleCloseModal}>
          <h3>{selectedNote.title}</h3>
          <p>{selectedNote.description}</p>
        </Modal>
      )}
    </div>
  );
};

export default NoteList;
