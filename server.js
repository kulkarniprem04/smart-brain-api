const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const Register = require('./Controllers/Register');
const signin = require('./Controllers/signin');
const profileget = require('./Controllers/profileget');
const image = require('./Controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });

const app = express();

app.use(cors())
app.use(express.json());


app.get('/', (req, res)=> {
    res.json('it is working');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { Register.handleRegister(req, res, db, bcrypt) })
    

app.get('/profile/:id', (req, res) => { profileget.handleProfileget(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageUrl', (req, res) => { image.handleImageUrl(req, res) })




/*// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/

app.listen(process.env.PORT || 3001, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})