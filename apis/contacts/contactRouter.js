const { getContact, newContact, getContactById, updateContact, deleteContact } = require("../contacts/contactController")
const router = require('express').Router();

router.get('/all', getContact);
router.post('/new', newContact);
router.get('/contactBy/:id', getContactById);
router.patch('/update/:id', updateContact);
router.delete('/delete/:id',deleteContact)

module.exports = router