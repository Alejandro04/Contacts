const express = require('express');
const router = express.Router();

const Contact = require('../models/contact')

router.get('/contacts', async (req, res) => {

    try {
        const contacts = await Contact.find()
        res.json(contacts);

    } catch (error) {
        res.json({
            error: error
        });
    }
})

router.post('/contacts', async (req, res) => {
    const { name, number } = req.body;
    const errors = [];
    if (!name) {
        res.json({
            message: 'Ingrese el nombre'
        })
    }
    if (!number) {
        res.json({
            message: 'Ingrese el número de teléfono'
        })
    }
    if (errors.length > 0) {
        res.json({
            errors,
            name,
            number
        })
    } else {
        try {
            const newContact = new Contact({ name, number });
            await newContact.save();

            res.json({
                contact: newContact
            });
        } catch (err) {
            console.log(err)
        }
    }
})


router.get('/contacts/:id', async (req, res) => {

    try {
        const contact = await Contact.findById(req.params.id)
        res.json(contact);

    } catch (error) {
        console.log(error)
        res.json({
            error: error
        });
    }
})


router.put('/contacts/:id', async (req, res) => {
    const { name, number } = req.body;

    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, { name, number });
        res.json(contact);

    } catch (error) {
        res.json({
            error: error
        });
    }
});

router.delete('/contacts/:id', async (req, res) => {
    const id = req.params.id

    try {
        const contact = await Contact.findByIdAndRemove(id)
        res.json(contact)

    } catch (error) {
        res.json({
            error: error
        });
    }
});

module.exports = router;