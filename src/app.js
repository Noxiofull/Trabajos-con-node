const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//Conecte db
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db=>console.log('db is connected'))
    .catch(err => console.log(err));

//Importar Router
 const indexRouter = require('./router/index');
//Setting
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname , "views"));
app.set('view engine','ejs');
//Middlewares
app.use(morgan('dev')); // Permite ver que pide el usuario en cada link
app.use(express.urlencoded({extended: false})) // Permite obtener mas informacion del url dondde navega el usuario
//Router
app.use('/',indexRouter);
//Start Server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})