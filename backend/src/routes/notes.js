const {Router} = require("express");
const router = Router();

const {getNotes,
    postNote,
    oneGet,
    updateNote,
    deleteNote} = require('../controllers/notes.controllers');

router.route("/")
    .get(getNotes)
    .post(postNote);

//Estos son los métodos de rutas que recibiran datos adicionales;

router.route("/:id")
    .get(oneGet)
    .put(updateNote)
    .delete(deleteNote);

module.exports = router;