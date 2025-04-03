const express = require('express')
const app = express()
const port = 3000
const path = require("path")
const cors = require("cors");
const routers = require("./routers/router")
const connectDB = require("./config/db");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/src"))

connectDB();
app.use(express.static(path.join(__dirname,"../frontend/public")))
app.use(express.json())
app.use(cors());
app.use('/',routers )


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})