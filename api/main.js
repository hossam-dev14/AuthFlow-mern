import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const connectDB = process.env.MONGO_URI;

mongoose
  .connect("mongodb+srv://hossam-auth:5sa33M3CXaR5C1oj@auth.hwy1rid.mongodb.net/auth?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to MongoDB (^_-) !');
  })
  .catch((err) => {
    console.log(err);
  });


// Middleware for parsing JSON bodies  
app.use(express.json()); 

// Middleware for parsing URL encoded bodies
app.use(express.urlencoded({ extended: true })); 

// Routes       
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/roles', require('./routes/router'));
// app.use('/api/permissions', require('./routes/permission'));

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/users'));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));

//   const path = require('path');
//   app.get('*', (req, res) => {      
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// } else {
//   const errorHandler = require('./middleware/error');   errorHandler(app);
// }


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

