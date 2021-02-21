
// require mongoose database
const mongoose = require('mongoose');

const { Schema } = mongoose;

// create the mongoose 
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
    },
  
    exercises: [
      {
        _id: false,
        type: {
          type: String,
          enum: ['resistance', 'cardio'],
          description: 'Can only be either cardio or resistance and is required',
        },
        name: {
          type: String,
          trim: true,
          required: 'Exercise name is Required',
        },
        distance: Number,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
      },
    ],
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true
    }
  }
);

// adds a dynamically-created property to schema
WorkoutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});


const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;