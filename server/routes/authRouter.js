const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const verifyJWT = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const formData = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  const user = await formData.save();
  const id = user._id;
  const token = jwt.sign({ id }, "jwtSecret", {
    expiresIn: 3000,
  });

  return res.send({ auth: true, token: token, user: user });
});

router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ auth: false });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.send({ auth: false });
  }
  const id = user._id;
  const token = jwt.sign({ id }, "jwtSecret", {
    expiresIn: 3000,
  });
  return res.send({ auth: true, token: token, user: user });
});

router.post("/verify", async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSCODE,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "OTP Verification for Hunger Food",
    text:
      "Thank you for choosing us. Use the " +
      otp +
      " as OTP to complete your Sign up procedures.",
  };
  User.find({ email: email }).then(function (data, docs) {
    const resp = JSON.stringify(data);
    if (resp.length > 2) {
      res.send("User exist");
    } else {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.send("Error!");
        } else {
          res.send("Success");
        }
      });
    }
  });
});

router.get("/isLoggedIn", verifyJWT, (req, res) => {
  res.send({ auth: true });
});

module.exports = router;