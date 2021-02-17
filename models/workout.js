
const mongoose = require('mongoose');

const { Schema } = mongoose;

const WorkoutSchema = new Schema({
    day: {
      type: Date,
      default: Date.now,
    },
  
    exercises: [
      {
        _id: false,
        type: {
          type: String,
          enum: ['resistance', 'cardio'],
          description: 'Can only be one of the enum values and is required',
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
  });



const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout