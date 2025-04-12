const express = require('express')
const app = express()
const PORT = 5000
const connectToMongo=require("./db")
var cors=require('cors');

app.use(cors);

connectToMongo();
app.use(express.json());


app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));


app.listen(PORT, () => {
  console.log(`Example: app listening on port ${PORT}`)
})

