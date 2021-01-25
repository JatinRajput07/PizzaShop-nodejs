'use strict';
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const routes = require('./routes/web');
const menuroutes = require('./routes/api')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const session = require('express-session')
const MongodbStore = require('connect-mongo')(session)
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const passportInit = require('./app/config/passport')
const events = require('events');


const PORT = process.env.PORT || 3000;



dotenv.config({path:'./config.env'})



// Connect with mongo DATABASE
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  //.connect(process.env.DATABASE_LOCAL,{})  if connect local database
  useCreateIndex:true,
  useNewUrlParser:true,
  useFindAndModify:false,  
  useUnifiedTopology: true
}).then(con=> console.log('DB connection succesfull!'))
  .catch(err => console.log("Connection Faild..."));

const connection = mongoose.connection;


//session store (session store in DB)
 const mongoStore =  new MongodbStore({
  mongooseConnection : connection,
  collection:'sessions'
})

// event Emmiter
const eventEmitter = new events.EventEmitter();
app.set('eventEmitter',eventEmitter)

//session config

app.use(session({
  secret: process.env.COOKIE_SECRET, 
  resave:false,
  store:mongoStore,
  saveUninitialized: true,
  cookie:{maxAge : 1000 * 60 * 60 *24 }
}))


// Passport config
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(express.urlencoded({extended:false}))
app.use(express.json());

//Globle Middleware 
app.use((req,res,next)=>{
  res.locals.session = req.session
  res.locals.user = req.user
next()
})
 

// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'))
// app.set('view engine','pug');
app.set('view engine', 'ejs');


// Serving static files

app.use(express.static(path.join(__dirname,'public')));
// app.use(cookieParser());

app.use(routes);
app.use('/pizza',menuroutes);

 const server =  app.listen(PORT, '127.0.0.1', () => {
  console.log(`hello from server port ${PORT}....`);
})  

//Socket  
const io = require('socket.io')(server)

io.on('connection',(socket)=>{
  //Join  
  console.log(socket.id)
  socket.on('join',(orderId)=>{
    console.log(orderId)
    socket.join(orderId)
  })
})

eventEmitter.on('orderUpdated',(data)=>{
  io.to(`order_${data.id}`).emit('orderUpdated',data)
})

eventEmitter.on('orderPlaced',(data)=>{
  io.to('adminRoom').emit('orderPlaced',data)
})