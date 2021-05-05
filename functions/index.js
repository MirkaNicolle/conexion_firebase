const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');

const app = express();

admin.initializeApp();

app.post('/item', (req, res) => {
    const newItem ={
        details: req.body.details,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    };

    admin.firestore()
        .collection('items')
        .add(newItem)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully`});
        })
        .catch(err =>{
            res.status(500).json({ error: 'something went wrong'});
            console.error(err);
        });
});

exports.api = functions.https.onRequest(app);