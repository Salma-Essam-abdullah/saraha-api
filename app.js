const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const connect  = require('./DB/connection');
const { userRoute, messageRoute, authRoute } = require('./modules/allRoutes.routes');
const path = require('path');

app.use("/uploads",express.static(path.join(__dirname,'./uploads')));
connect();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(userRoute, messageRoute, authRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }   
);
