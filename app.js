const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const PORT = 5000;
const mongoose = require("mongoose");
const { request } = require("express");

// MIDDLEWARE
app.use(express.static("./public"));
app.use(express.json());

const DB =
  "mongodb+srv://blanc_sapphire:Rah_XJ276Sj436M@cluster0.bnmkp.mongodb.net/registrationData?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection to database SUCCESSFUL");
  })
  .catch((err) => {
    console.log("couldn't connect to database :(");
  });

let localModel = new mongoose.Schema({
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
});

let localSchema = mongoose.model(
  "localization",
  localModel,
  "my-collection-name"
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});
app.post("/", (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "evergreen24712@gmail.com",
      pass: "account@24712",
    },
  });
  const mailOptions = {
    from: req.body.email,
    to: "evergreen24712@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text:
      req.body.message +
      `\nphone no. ${req.body.phone} \nmail id: ${req.body.email}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Sorry, an error occured while processing your request :((");
    } else {
      console.log("email sent" + info.response);
      res.send("success");
    }
  });

  localSchema
    .insertMany({
      email: `${req.body.email}`,
      phone: `${req.body.phone}`,
      subject: `${req.body.subject}`,
      message: `${req.body.message}`,
    })
    .then(function () {
      console.info("insert new data successfully");
    })
    .catch(function () {
      console.error("has error when insert new data");
    });
});

app.listen(PORT, () => {
  console.log("server listening on port 5000...");
});
