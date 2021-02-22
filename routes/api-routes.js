const router = require('express').Router();
const Workout = require('../models/workout.js');

// add new workout
router.post("/api/workouts", (req, res) => {
  Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// update / continue previous workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
  
  Workout.findByIdAndUpdate(
    params.id, { $push: { exercises: body } }, { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// retrieve the workout
router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// look at the total amount of exercises in a workout
router.get("/api/workouts/range", (req, res) => {
  
  Workout.find({}).then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

// delete the exercise / workout  ..not used
router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});

  module.exports = router;
  