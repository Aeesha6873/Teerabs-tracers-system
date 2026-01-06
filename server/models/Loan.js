const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['individual', 'cluster'],
    required: true
  },
  clusterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0
  },
  term: {
    type: Number,
    required: true
  },
  purpose: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'disbursed', 'rejected', 'completed'],
    default: 'pending'
  },
  disbursementDate: Date,
  dueDate: Date,
  repaymentSchedule: [{
    dueDate: Date,
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid', 'overdue'],
      default: 'pending'
    }
  }],
  collateral: {
    type: String,
    description: String,
    value: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Loan', loanSchema);