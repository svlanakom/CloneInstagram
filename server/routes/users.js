const express = require('express')
const router = express.Router();
const User = require('../models/user')

router.post('/add', async(req, res) => {
  delete req.body.password1;
     console.log(req.body)
    await User.create(req.body)
    res.sendStatus(200);
  });


router.get('/get/:email', async (req, res) => {
  let user = await User.findOne({email: req.params.email});
  console.log(user)
  res.status(200).send(user || {});
});
router.get('/get', async (req, res) => {
  let users = await User.find();
  console.log(users)
  res.status(200).send(users);
});

router.delete('/delete/:email', async (req , res) => {
  await User.findOneAndDelete({email: req.params.email});
  res.sendStatus(200);
})




module.exports = router;