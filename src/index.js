var express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require("express-handlebars");
const port = 3000;
const route = require('./routes')

const app = express();
app.use(express.static(path.join(__dirname,'public')))
//http logger morgan
app.use(morgan('combined'))
//template engine

app.engine("hbs", engine({
  extname: '.hbs'
}));
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, '/resources/views'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Routes
route(app);





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})