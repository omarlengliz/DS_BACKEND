const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require("./routes/UserRoutes") 
const publicationsRoutes = require("./routes/PublicationRoutes") 
const authRoutes = require("./routes/AuthRoutes") 

connectDB()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use("/api/auth" ,authRoutes )
app.use("/api/users" ,userRoutes )
app.use("/api/publications" , publicationsRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
