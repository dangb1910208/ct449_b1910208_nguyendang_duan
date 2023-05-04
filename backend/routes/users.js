const express = require("express");
const router = express.Router();
const users = require("../models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10); //noi them 10 ky tu cho bao mat mat khau hon
  const hashedPassword = await bcrypt.hash(req.body.password, salt); //bam mat khau
  const user = new users({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
  });
  try {
    if (await users.findOne({ email: user.email })) {
      return res.json({ message: "Tồn tại rồi bạn ơi" });
    }
    const result = await user.save();
    const { password, ...data } = result.toJSON(); //ep ve dang json
    res.json(data);
  } catch (err) {
    res.send(err);
  }
});
router.post("/login", async (req, res) => {
  const user = await users.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ message: "Not find thay " });
  }
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.json({ message: "sai bet roi" });
  }
  const token = jwt.sign({ _id: user._id }, "secret");
  const { password, ...data } = user.toJSON();
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
  res.json({
    message: "success",
    token: token,
    user: data,
  });
});
router.get("/", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"]; //gọi tới cookies đặt tên jwt;
    const claims = jwt.verify(cookie, "secret"); //Xác nhận nó trả claims về 1 obj
    const user = await ussers.findOne({ _id: claims._id });
    const { password, ...data } = user.toJSON();
    res.send(data);
  } catch (err) {
    return res.status(401).json({ message: "0 XAC THUC NGUOI dung" });
  }
});
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({ message: "ok" });
});
module.exports = router;
