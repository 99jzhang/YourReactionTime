const express = require("express");
const app = express();

const authRouter = require('./routes/oauth');
const requestRouter = require('./routes/request');

const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "banana", "orange"] });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.use('/oauth', authRouter);
app.use('/request', requestRouter);

module.exports = app;