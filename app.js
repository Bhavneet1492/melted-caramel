const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const PORT = 5000;

// MIDDLEWARE
app.use(express.static("./public"));
app.use(express.json());

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
});

app.listen(PORT, () => {
  console.log("server listening on port 5000...");
});
