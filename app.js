const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ejs = require('ejs');
const { password } = require('./config');
const fileUpload = require('express-fileupload');

const {
  getAllPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
} = require('./controllers/photoControllers');

const {
  getAboutPage,
  getAddPage,
  getEditPage,
} = require('./controllers/pageController');

const app = express();

//connect db

mongoose
  .connect(
    `mongodb+srv://melih:${password}@cluster0.7hkgf.mongodb.net/pcat-db?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log('Db connected');
  })
  .catch((err) => console.log(err));

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', getAllPhotos);
app.get('/photos/:id', getPhoto);

app.get('/about', getAboutPage);

app.get('/add', getAddPage);

app.get('/photos/edit/:id', getEditPage);

app.post('/photos', createPhoto);

app.put('/photos/:id', updatePhoto);

app.delete('/photos/:id', deletePhoto);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
