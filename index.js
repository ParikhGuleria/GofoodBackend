const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const connectToMongo=require("./db")
var cors=require('cors');

app.use(cors());

connectToMongo();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('we are live!');
});


app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));


app.listen(port, '0.0.0.0', () => {
  console.log(`Example: app listening on port: ${port}`);
});


