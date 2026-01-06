const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  evaluatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  evaluationDate: {
    type: Date,
    default: Date.now
  },
  criteria: {
    financialStability: { type: Number, min: 1, max: 5 },
    businessPlan: { type: Number, min: 1, max: 5 },
    creditHistory: { type: Number, min: 1, max: 5 },
    collateral: { type: Number, min: 1, max: 5 }
  },
  overallScore: Number,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'needs_review'],
    default: 'pending'
  },
  comments: String,
  documents: [String]
}, {
  timestamps: true
});

evaluationSchema.pre('save', function(next) {
  const scores = Object.values(this.criteria);
  this.overallScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  next();
});

module.exports = mongoose.model('Evaluation', evaluationSchema);