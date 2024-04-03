import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CreateNoteForm from '../components/CreateNoteForm';
import NoteList from '../components/NoteList';
import '../styles/Home.css';

const Home = () => {
  const [view, setView] = useState('grid');
  const [theme, setTheme] = useState('light');

  const toggleView = (newView) => {
    setView(newView);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`${theme}`}>
      <Navbar view={view} toggleView={toggleView} toggleTheme={toggleTheme} />
      <CreateNoteForm />
      <NoteList view={view} />
    </div>
  );
};

export default Home;
