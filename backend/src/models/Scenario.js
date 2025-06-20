import mongoose from 'mongoose';

const scenarioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    minlength: [3, 'Title must be at least 3 characters long']
  },
  budget: {
    type: Number,
    required: [true, 'Please add a budget'],
    min: [0, 'Budget cannot be negative']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  timeline: {
    type: String,
    required: [true, 'Please add a timeline']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  simulation: {
    recommendations: String
  }
}, {
  timestamps: true
});

// Middleware to log the scenario object before saving (for debugging)
scenarioSchema.pre('save', function(next) {
  console.log('Saving scenario:', this.toObject());
  next();
});

export default mongoose.model('Scenario', scenarioSchema); 