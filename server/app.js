const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users')
const cors = require("cors");


const User = require('./models/user');

dbConnect().catch(err => console.log(err));

async function dbConnect() {
  await mongoose.connect('mongodb://localhost:27017');
}

// mongoose.connect('mongodb+srv://admin:admin@cluster0.ndsjr.mongodb.net/?retryWrites=true&w=majority');



const app = express();
const port = 3000
app.use(bodyParser.json());
app.use(cors());

app.use('/image', express.static('images'))

app.use('/', indexRouter);
app.use('/users', usersRouter)

// app.get('/image/:fileName', (req, res) => {
//     res.send(`images/${req.params.fileName}`);
   
// })

// app.post('/image', upload.any('image'),(req, res) => {
//   console.log(req.files)
//   res.sendStatus(200);
// })



app.listen(port, () => {
  console.log(`Exsample app listening on port ${port}`)
})
