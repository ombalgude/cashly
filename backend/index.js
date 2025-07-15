const express = require("express");
const cors = require("cors")
const mainRouter = require("./routes/index.js")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to the Cashly landing page");
});

app.use("/api/v1" , mainRouter )

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listing in port ${PORT}`)
})