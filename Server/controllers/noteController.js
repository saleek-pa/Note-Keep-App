const Note = require('../models/notesModel');

const getAllNotes = async (req, res) => {
  const user = req.user;
  const notes = await Note.find({ userId: user.userId });
  return res.status(200).json({
    status: 'success',
    message: 'Notes retrieved successfully',
    data: notes,
  });
};

const getNoteByID = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) {
    return res.status(404).json({
      status: 'failure',
      message: 'Note not found',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Note retrieved successfully',
    data: note,
  });
};

const createNote = async (req, res) => {
  const note = req.body;
  const user = req.user;
  const newNote = await Note.create({ ...note, userId: user.userId });
  return res.status(201).json({
    status: 'success',
    message: 'Note created successfully',
    data: newNote,
  });
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const note = req.body;
  const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true });
  if (!updatedNote) {
    return res.status(404).json({
      status: 'failure',
      message: 'Note not found',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Note updated successfully',
    data: updatedNote,
  });
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const deletedNote = await Note.findByIdAndDelete(id);
  if (!deletedNote) {
    return res.status(404).json({
      status: 'failure',
      message: 'Note not found',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Note deleted successfully',
    data: deletedNote,
  });
};

module.exports = { getAllNotes, getNoteByID, createNote, updateNote, deleteNote };
