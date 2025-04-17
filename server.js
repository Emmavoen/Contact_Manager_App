const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { router } = require("./routes/contactRoutes.js");
const errorHandler = require("./middleware/errorHandler.js");
const connectDB = require("./config/dbConnection.js");
connectDB();

const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/contacts", router);
app.use("/api/contactsusers", users);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
