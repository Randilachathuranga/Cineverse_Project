const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const filmController = require('../controllers/filmcontroller');
const auth = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

/// Image storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files are stored
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname +"_" + Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Get all films - This can be accessed by all authenticated users
router.get('/all', auth, filmController.getFilms);

// get all films for guest user
router.get('/Guest/all',filmController.getFilmsforGuest);

// Get a film by ID - This can be accessed by all authenticated users
router.get('/:id', auth, filmController.getFilmById);

// Get a film by ID - for guest user
router.get('/Guest/:id',filmController.getFilmByIdforguestuser);

// Create a new film - Accessible only by admins
router.post('/CreateFilm',
  auth,
  authorize(['admin']), 
  upload.single('image'), // Add this line to handle image upload
  filmController.createFilm
);

// Update film by ID - Accessible only by admins
router.put('/:id', 
  auth, 
  authorize(['admin']), 
  upload.single('image'), // Include this if updating the image
  filmController.updateFilm
);

// Delete film by ID - Accessible only by admins
router.delete('/:id', 
  auth, 
  authorize(['admin']), 
  filmController.deleteFilm
);

module.exports = router;
