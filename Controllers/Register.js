const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;
    const hash = bcrypt.hashSync(password);
    if(!email || !name || !password) {
        return res.status(400).json('enter right credentials')
      }
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(Loginemail => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: Loginemail[0],
                    joined: new Date()
                }).then(user => {
                    res.json(user[0]);
                })           
            })
              .then(trx.commit)
              .catch(trx.rollback)
        })
        .catch(error => res.status(400).json('cannot register'))

    }

    module.exports = {
        handleRegister: handleRegister
    };