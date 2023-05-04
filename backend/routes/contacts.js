const express = require("express");
const router = express.Router();
const contacts = require("../models/contacts.js");
router
  .route("/")
  .get(async (req, res) => {
    let documents = [];
    try {
      const { name } = req.query;
      if (name) {
        documents = await contacts.find({ name: name });
      } else {
        documents = await contacts.find({});
      }
      res.send(documents);
    } catch (err) {
      res.status(500).json({ message: err.message });
      //Không phải lỗi người dùng hay khách hàng
      //Lỗi 500 là do CSDL có vấn đề
    }
  })
  .post(async (req, res) => {
    const c = new contacts({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      favorite: req.body.favorite,
    });
    try {
      const newC = await c.save();
      res.status(201).json(newC);
    } catch (err) {
      //Lỗi 400 là do người dùng nhập vào nha
      res.status(400).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await contacts.deleteMany({});
      res.status(200).json(result.deletedCount);
    } catch (err) {
      //Lỗi 400 là do người dùng nhập vào nha
      res.status(500).json({ message: err.message });
    }
  });
// .get(contacts.findAll)
// .post(contacts.create)
// .delete(contacts.deleteAll);

router.route("/favorite").get(async (req, res) => {
  try {
    const documents = await contacts.find({ favorite: true });
    res.send(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
    //Không phải lỗi người dùng hay khách hàng
    //Lỗi 500 là do CSDL có vấn đề
  }
});

router
  .route("/:id")
  .get(getcontact, async (req, res) => {
    res.send(res.contact);
  })
  .put(getcontact, async (req, res) => {
    if (req.body.name != null) {
      res.contact.name = req.body.name;
    }
    if (req.body.email != null) {
      res.contact.email = req.body.email;
    }
    if (req.body.address != null) {
      res.contact.address = req.body.address;
    }
    if (req.body.phone != null) {
      res.contact.phone = req.body.phone;
    }
    if (req.body.favorite != null) {
      res.contact.favorite = req.body.favorite;
    }

    try {
      const updatedC = await res.contact.save();
      res.json(updatedC);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
  .delete(getcontact, async (req, res) => {
    if(await res.contact.deleteOne()){
      res.status(200).json({message : "Xoa thanh cong"});
    }
    
  })
async function getcontact(req, res, next) {
  let contact;
  try {
    contact = await contacts.findById(req.params.id);
    if (contact == null) {
      //Lỗi 404 không tìm thấy
      return res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
  res.contact = contact;
  next();
}
module.exports = router;
