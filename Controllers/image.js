const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '62343dec98574bc9b3bb64c86c008bf5'
   });

const handleImageUrl = (req, res) => {
   app.models.predict(
    'c0c0ac362b03416da06ab3fa36fb58e3',
    req.body.input)
    .then(data => {
        res.json(data);
    })
   }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(error => res.status(400).json('error'))
}

module.exports = {
    handleImage,
    handleImageUrl
}