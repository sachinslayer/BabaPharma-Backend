const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const apiRoutes = require('./routes/api');
const SignUp=require('./routes/Signup')
const cookieParser = require('cookie-parser')

app.get('/',(req,res)=>{
  res.send("Backend working Properly")
})

mongoose.connect('mongodb://127.0.0.1:27017/BaBa', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.log('Error connecting to MongoDB: ' + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.use(cors());
app.use(cookieParser())

app.use('/api', apiRoutes);


app.use('',SignUp);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});
