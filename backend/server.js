const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const confirmedRoute = require("./Routes/CovidNzData.route");
const dhb = require("./Routes/dhbdata.route");
const stats = require("./Routes/stats.route");
const recovery = require("./Routes/recovery.route");
const agegroup = require("./Routes/agegroup-gender-affected.route");
const path = require("path");
require("dotenv").config({ debug: process.env.DEBUG });

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", confirmedRoute);
app.use("/api", dhb);
app.use("/api", stats);
app.use("/api", recovery);
app.use("/api", agegroup);
app.use(express.static(path.join(__dirname, "frontend/build")));

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, 'frontend/build')))
//     app.get('*', (req,res) => {
//         res.sendFile(path.join(__dirname = 'frontend/build/index.html'))
//     })
//     console.log('production mode')
// } else {
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname+'/frontend/public/index.html'))
//    })
// }

app.listen(port, () => {
  console.log(path.resolve(__dirname, "build", "index.html"));
  console.log(`server is running on port: http://localhost:${port}`);
});
