const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const assetRoutes = require("./routes/assetRoutes");
const authRoute = require("./routes/auth");
// const MaintenanceRoutes = require("./routes/MaintenanceRoutes");
const adminRoutes = require("./routes/AdminUsers");
const assignmentsRouter = require('./routes/assignments');
const AdminUser = require('./models/AdminUser');
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/", assetRoutes);
app.use("/", authRoute);
// app.use('/api/maintenance', MaintenanceRoutes);// Ensure this route is used
app.use("/", adminRoutes);
app.use("/api/assignments", assignmentsRouter);



app.post('/users', async (req, res) => {
    try {
      console.log(req.body)
        const newUser = new AdminUser(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb://localhost:27017/DataStore");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
