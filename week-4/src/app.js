const express = require('express');

const authRoutes = require('./routes/auth.routes');
const publicRoutes = require('./routes/pubic.routes');
const protectedRoutes = require('./routes/protected.routes');


const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
  res.json({
    message : 'backend server is running'
  })
})


// routes

app.use('/auth', authRoutes);
app.use('/public', publicRoutes);
app.use('/protected', protectedRoutes);


module.exports = app;

