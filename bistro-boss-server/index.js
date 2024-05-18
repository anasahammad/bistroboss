const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000
require('dotenv').config()



//middleware
app.use(cors())
app.use(express.json())



app.get('/', async(req, res)=>{
    res.send('boss is coming')
})

app.listen(port, ()=>{
    console.log(`The server is running from ${port}`);
})