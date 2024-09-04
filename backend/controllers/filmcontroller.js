const Film = require("../models/Film");

// Create a new film
exports.createFilm = async (req, res) => {
  try {
    const { title, description, genre, release_date, duration,rating } = req.body;
    const image = req.file.path;
    let film = await Film.findOne({ title });
    if (film) {
      return res.status(400).json({ msg: "Film already exists" });
    }

    film = new Film({
      title,
      description,
      genre,
      release_date,
      duration,
      rating,
      image,
    });
    await film.save();
    res.status(201).json(film);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Get all films
exports.getFilms = async (req, res) => {
  try {
    const films = await Film.find();
    res.json({films, }); // Return the films array directly
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Get all films for guest user
exports.getFilmsforGuest = async (req, res) => {
  try {
    const films = await Film.find();
    res.json({films}); // Return the films array directly
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Get a film by ID
exports.getFilmById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);

    if (!film) {
      return res.status(404).json({ msg: "Film not found" });
    }

    res.json(film);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Get a film by ID for Guest user
exports.getFilmByIdforguestuser = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);

    if (!film) {
      return res.status(404).json({ msg: "Film not found" });
    }

    res.json(film);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Update film by ID
exports.updateFilm = async (req, res) => {
  try {
    const { title, description, genre, release_date, duration } = req.body;
    const film = await Film.findByIdAndUpdate(
      req.params.id,
      { title, description, genre, release_date, duration },
      { new: true }
    );

    if (!film) {
      return res.status(404).json({ msg: "Film not found" });
    }

    res.json(film);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Delete film by ID
exports.deleteFilm = async (req, res) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);

    if (!film) {
      return res.status(404).json({ msg: "Film not found" });
    }

    res.json({ msg: "Film deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
