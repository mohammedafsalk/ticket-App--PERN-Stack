const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const userAuthRoute = require("./routes/authuser.routes");
const adminAuthRoute = require("./routes/authadmin.router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieparser());
app.use(cors());

//Routes
app.use("/api/user/auth", userAuthRoute);
app.use("/api/admin/auth", adminAuthRoute);

//Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const msg = err.message || "Internal Server Error";
  res.status(500).json({
    success: false,
    message: msg,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
