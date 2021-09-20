const express = require("express");
const cors = require("cors");
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())



app.use("/user", require("./controller/user.controller"));


let server = app.listen(4545, function(){
	console.log('Server listen on port: 4545');
})