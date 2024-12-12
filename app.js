const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const { getRegistrations, postRegistration } = require('./controllers/registrationController');

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing 
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/registration', getRegistrations);
app.post('/registration', postRegistration);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})