const express = require('express')
const firebase = require('firebase')

const router = express.Router()
const db = firebase.firestore()

router.get('/getAll', (req, res) => {
  db.collection('users')
    .get()
    .then(data => {
      let users = []
      data.forEach(doc => {
        users.push(doc.data())
      })
      return res.json(users)
    })
    .catch(err => {
      return res.json({ error: err })
    })
})

router.post('/register', (req, res) => {
  let { user } = req.body

  let addUser = data => {
    db.collection('screams')
      .add(data)
      .then(doc => {
        return res.json({ message: `user ${doc.id} created ` })
      })
      .catch(err => {
        return res.json({ error: err })
      })
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(doc => addUser(user))
    .catch(error => {
      return res.json({ error: error })
    })
})

router.post('/signIn', (req, res) => {
  let { user } = req.body
  db.collection('screams')
    .get()
    .then(data => {
      data.forEach(doc => {
        if (doc.data().name === user.name) {
          if (doc.data().password !== user.password) {
            return res.json({ message: `password not match` })
          }
          return res.json({ message: `user ${doc.id} existed` })
        }
      })
      return res.json({ message: `user not existed` })
    })
    .catch(err => {
      return res.json({ error: err })
    })
})

module.exports = router
