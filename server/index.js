const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const userAuthRoute = require("./routes/user.routes");
const adminAuthRoute = require("./routes/admin.router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieparser());

//Cors settings
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

//Routes
app.use("/api/user/", userAuthRoute);
app.use("/api/admin/", adminAuthRoute);

//Error handler
app.use((err, req, res, next) => {
  const msg = err || "Internal Server Error";
  res.status(500).json({
    success: false,
    message: msg,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
