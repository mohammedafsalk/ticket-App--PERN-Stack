const express = require("express");
const cors = require("cors");
const userAuthRoute = require("./routes/auth.user");
const adminAuthRoute = require("./routes/auth.admin");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/user/auth", userAuthRoute);
app.use("/api/admin/auth", adminAuthRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
