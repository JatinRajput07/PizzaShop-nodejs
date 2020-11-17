const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path')
const expressLayout = require('express-ejs-layouts')

app.get('/',(req,res)=>{
  res.render('home')
});


// set template engine
app.use(expressLayout);
app.set('views',path.join(__dirname, '/resources/views'))
app.set('view engine','pug');


const PORT = process.env.PORT || 3000;
app.listen(PORT,'127.0.0.1',()=>{
  console.log(`hello from server port ${PORT}....`);
})