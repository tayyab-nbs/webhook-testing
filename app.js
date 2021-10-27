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

router.post("/receiveWebhook", function (req, res) {
  console.log(req.body); // Call your action on the request here
  res.status(200).end(); // Responding is important
  // console.log("YAHOO WEEBHOOK RECEIVED");
  // console.log(res);
});

router.get("/getData", (req, response) => {
  const token = "7a109c01af2a4ed3b161f26ce4ef6d2b";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };

  const bodyParameters = {
    callbackUri: "https://webhook007755-app.herokuapp.com/receiveWebhook",
  };
  axios
    .post(
      "https://services.sheerid.com/rest/v2/program/6177e7c5b761aa366d5a96d5/webhook",
      bodyParameters,
      config
    )
    .then((resp) => {
      console.log("SHEER ID WEEBHOOK INITIATE RES : ", resp.data);
    })
    .catch((err) => {
      console.log("The following error occured: ");
    });

  // axios
  //   .get("https://jsonplaceholder.typicode.com/todos/1")
  //   .then((res) => {
  //     const headerDate =
  //       res.headers && res.headers.date ? res.headers.date : "no response date";
  //     console.log("Status Code:", res.status);
  //     console.log("Date in Response header:", headerDate);

  //     const users = res.data;
  //     response.send(users);
  //   })
  //   .catch((err) => {
  //     console.log("Error: ", err.message);
  //   });
});

router.get("/sitemap", function (req, res) {
  res.sendFile(path.join(__dirname + "/sitemap.html"));
});

//add the router
app.use("/", router);
app.listen(process.env.PORT || 5000, () => {
  console.log("Running at Port: 5000");
});
