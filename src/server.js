var express=require('express')
var port=3000
var conn= require("./routes/conn")

var app = express()


app.use('/',conn)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  
