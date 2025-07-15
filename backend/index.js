const express = require("express");
const cors = require("cors")
const mainRouter = require("./routes/index.js")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to the Cashly Landing Page API 🚀");
});

app.use("/api/v1" , mainRouter )

app.listen(3000, () => {
    console.log("listing in port 3000")
})