const express = require('express');
const workerpool = require('workerpool');
const cors = require('cors');

const app = express();
app.use(cors());
const pool = workerpool.pool();

const workHard = () => {
    count = 0;
    // Simulate a long running process
    for (let i = 0; i < 1000000000; i++) {
        count += i;
    }
};

app.get('/small', async (req, res) => {
    res.send("Small End Point");
});

app.get('/big', async (req, res) => {
    pool.exec(workHard).then(() => {
        res.send("Big End Point");
    });
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});