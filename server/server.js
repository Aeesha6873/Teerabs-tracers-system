const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/teerabs-tracers",
  {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
  }
);

// Routes
app.get("/", (req, res) => {
  res.redirect("http://localhost:5173");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/clusters", require("./routes/user"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// app.use('/api/evaluations', require('./routes/evaluation'));
// app.use('/api/monitoring', require('./routes/monitoring'));
// app.use('/api/progress', require('./routes/progress'));
// app.use('/api/remittance', require('./routes/remittance'));
// app.use('/api/proposals', require('./routes/proposal'));
// app.use('/api/onboarding', require('./routes/onboarding'));
// app.use('/api/loans', require('./routes/loans'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
