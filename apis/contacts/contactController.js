const db = require('../../server/connection');
const Contact = db.contact;

const getContact = async (req, res) => {
    const data = await Contact.findAll({});
    res.status(200).json({ data: data })
}

const newContact = async (req, res) => {
    const contactData = req.body;
    if (contactData.length > 1) {
        var data = await Contact.bulkCreate(contactData)
    }
    else {
        var data = await Contact.create(contactData);
    }
    res.status(200).json({ data: data })
}

const getContactById = async (req, res) => {
    const data = await Contact.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data: data })
}

const updateContact = async (req, res) => {
    const updatedData = req.body
    const data = await Contact.update(updatedData, {
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data: data })
}

const deleteContact = async (req, res) => {
    const data = await Contact.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data: data })
}

module.exports = {
    getContact,
    newContact,
    getContactById,
    updateContact,
    deleteContact
}