const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const axios = require("axios");

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname : It will resolve to your project folder.
});

router.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/about.html"));
});

router.get("/getData", (req, response) => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => {
      const headerDate =
        res.headers && res.headers.date ? res.headers.date : "no response date";
      console.log("Status Code:", res.status);
      console.log("Date in Response header:", headerDate);

      const users = res.data;
      response.send(users);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
});

router.get("/sitemap", function (req, res) {
  res.sendFile(path.join(__dirname + "/sitemap.html"));
});

//add the router
app.use("/", router);
app.listen(process.env.port || 3000, () => {
  console.log("Running at Port: 3000");
});
