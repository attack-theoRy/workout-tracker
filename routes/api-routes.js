const router = require('express').Router();
const Workout = require('../models/workout.js');

// add new workout
router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// update / continue previous workout
router.put("/api/workouts/:id", (req, res) => {
  
  const id = req.params.id;
  const body = req.body;

  Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: body } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
  
  
 /* Workout.findByIdAndUpdate(
    params.id, { $push: { exercises: body } }, { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
*/

// retrieve the workout
router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

// look at the total amount of exercises in a workout
router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(7)
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});



// delete the exercise / workout
// not used with current buttons, trying stuff out
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
  