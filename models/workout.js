
// require mongoose database
const mongoose = require('mongoose');

const { Schema } = mongoose;

// create the mongoose 
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
    },
  
    exercises: [
      {
        type: {
          type: String,
          enum: ['resistance', 'cardio'],
          description: 'Cardio or resistance only',
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
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
workoutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});


const Workout = mongoose.model('workout', workoutSchema);

module.exports = Workout;