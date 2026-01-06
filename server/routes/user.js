const express = require('express');
const { getUserProfile, updateUserProfile, getAllUsers, updateUserRole } = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// router.get('/profile', protect, getUserProfile);
// router.put('/profile', protect, updateUserProfile);

// // Admin routes
// router.get('/', protect, admin, getAllUsers);
// router.put('/:userId/role', protect, admin, updateUserRole);


const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getCluster,
  getClusters
} = require('../controllers/userController');

// Public routes
router.post('/', createUser);

// Protected routes (add authentication middleware later)
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Cluster routes
router.get('/clusters', getClusters);
router.get('/cluster/:id', getCluster);

module.exports = router;

