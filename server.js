const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require('../models/workout.js');


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });



mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
  

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  

  // Get all workouts route and adding totalDuration
app.get('/workouts', (req, res) => {
    Workout.aggregate([{ $set: { totalDuration: { $sum: '$exercises.duration' }}}])
      .sort({ day: 1 })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
  // Create workout route
  app.post('/workouts', ({ body }, res) => {
    Workout.create(body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  