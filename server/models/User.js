const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   lastName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   profile: {
//     phone: String,
//     address: String,
//     dateOfBirth: Date
//   },
//     bvn: {
//     type: Number,
//     required: true
//   },
//     nin: {
//     type: Number,
//     required: true
//   },
//     businessName: {
//     type: String,
//   },
//     proposal: {
//     type: String,
    
//   },
//       bankName: {
//     type: String,
//     required: true
//   },
//     accountNumber: {
//     type: Number,
   
//   },
//       accountName: {
//     type: String,
//     required: true
//   },
// }, {
//   timestamps: true
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// // Compare password method
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'cluster_leader'],
    default: 'user'
  },
  accountType: {
    type: String,
    enum: ['individual', 'cluster'],
    default: 'individual'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profile: {
    phone: String,
    address: String,
    dateOfBirth: Date
  },
  // Individual user fields
  bvn: String,
  nin: String,
  state: String,
  lga: String,
  businessName: String,
  proposal: String,
  bankDetails: {
    bankName: String,
    accountName: String,
    accountNumber: String
  },
  // Cluster-specific fields
  clusterName: String,
  clusterSize: Number,
  clusterLeader: String,
  clusterMembers: [{
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    bvn: String,
    nin: String,
    state: String,
    lga: String,
    bankDetails: {
      bankName: String,
      accountName: String,
      accountNumber: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  savingsVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);