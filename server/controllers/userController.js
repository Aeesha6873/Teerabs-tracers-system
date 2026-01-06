const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        firstName, 
        lastName, 
        'profile.phone': phone, 
        'profile.address': address 
      },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




//--------------------------------------Create new user

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      accountType,
      profile,
      bvn,
      nin,
      state,
      lga,
      businessName,
      proposal,
      bankDetails,
      clusterName,
      clusterSize,
      clusterLeader,
      clusterMembers
    } = req.body;

    // console.log('Received registration type:', accountType);
    // console.log('Cluster members data:', req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Prepare user data
    const userData = {
      firstName,
      lastName,
      email,
      password,
      role: accountType === 'cluster' ? 'cluster_leader' : (role || 'user'),
      accountType: accountType || 'individual',
      profile: profile || {},
      bvn,
      nin,
      state,
      lga,
      businessName,
      proposal,
      bankDetails
    };

    // Add cluster-specific data if it's a cluster registration
    if (accountType === 'cluster') {
      userData.clusterName = clusterName;
      userData.clusterSize = clusterSize || 1;
      userData.clusterLeader = clusterLeader || `${firstName} ${lastName}`;
      userData.clusterMembers = clusterMembers || [];
      userData.savingsVerified = false;

      // Validate cluster members
      if (clusterMembers && clusterMembers.length > 0) {
        for (let member of clusterMembers) {
          // Check if any cluster member email already exists
          const existingMember = await User.findOne({ email: member.email });
          if (existingMember) {
            return res.status(400).json({
              success: false,
              message: `Cluster member with email ${member.email} already exists`
            });
          }
        }
      }
    }

    // Create new user
    const user = await User.create(userData);

    // If it's a cluster, also create user accounts for each member
    if (accountType === 'cluster' && clusterMembers && clusterMembers.length > 0) {
      try {
        for (let member of clusterMembers) {
          // Generate a temporary password for cluster members
          const tempPassword = Math.random().toString(36).slice(-8);
          
          await User.create({
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
            password: tempPassword,
            role: 'user',
            accountType: 'individual',
            profile: {
              phone: member.phone,
              address: `${member.lga}, ${member.state}, Nigeria`
            },
            bvn: member.bvn,
            nin: member.nin,
            state: member.state,
            lga: member.lga,
            bankDetails: member.bankDetails,
            // Link to cluster
            clusterId: user._id,
            clusterName: clusterName,
            isActive: false // Members need to activate their accounts
          });
        }
      } catch (memberError) {
        console.error('Error creating cluster members:', memberError);
        // Don't fail the main registration if member creation fails
      }
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: accountType === 'cluster' ? 'Cluster registered successfully' : 'User created successfully',
      data: userResponse
    });

  } catch (error) {
    console.error('Create user error:', error);
    
    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error creating user',
      error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
  }
};

//----------------------------------Get cluster by ID

const getCluster = async (req, res) => {
  try {
    const cluster = await User.findById(req.params.id)
      .select('-password')
      .populate('clusterMembers', 'firstName lastName email phone isActive');

    if (!cluster || cluster.registrationType !== 'cluster') {
      return res.status(404).json({
        success: false,
        message: 'Cluster not found'
      });
    }

    res.status(200).json({
      success: true,
      data: cluster
    });
  } catch (error) {
    console.error('Get cluster error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching cluster'
    });
  }
};

//----------------------------------Get all clusters

const getClusters = async (req, res) => {
  try {
    const clusters = await User.find({ accountType: 'cluster' })
      .select('-password -clusterMembers');

    res.status(200).json({
      success: true,
      count: clusters.length,
      data: clusters
    });
  } catch (error) {
    console.error('Get clusters error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching clusters'
    });
  }
};



//---------------------Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching users'
    });
  }
};

//-------------------------------------Get single user

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error fetching user'
    });
  }
};

//------------------------------------Update user

const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      profile
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        email,
        profile
      },
      {
        new: true, // Return updated document
        runValidators: true
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error updating user'
    });
  }
};

//-------------------------Delete user

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error deleting user'
    });
  }
};


module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getCluster,
  getClusters
};