const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const tryCatch = require('../middlewares/tryCatch');
const { getAllNotes, getNoteByID, createNote, updateNote, deleteNote } = require('../controllers/noteController')
const router = express.Router();

router.get('/notes', checkAuth, tryCatch(getAllNotes));
router.get('/notes/:id', checkAuth, tryCatch(getNoteByID));
router.post('/notes', checkAuth, tryCatch(createNote));
router.put('/notes/:id', checkAuth, tryCatch(updateNote));
router.delete('/notes/:id', checkAuth, tryCatch(deleteNote));

module.exports = router;
