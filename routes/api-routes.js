const router = require('express').Router();
const Workout = require('../models/workout.js');

// Get all workouts route and adding totalDuration
  router.get('api/workouts', (req, res) => {
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
  router.post('api/workouts', ({ body }, res) => {
    Workout.create(body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  // Add exercise to workout route
router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findOneAndUpdate({ _id: params.id }, { $push: { exercises: body } }, { new: true })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  module.exports = router;
  