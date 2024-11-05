const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require('./../models/user')


router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({
    data: users,
    message: "OK",
  })
});


router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).json({ data: null, message: "user not found" });
  res.json({
    data: user,
    message: "OK",
  });
});

router.post(
  "/",
  [
    body("email", "email must be valid").isEmail(),
    body("first_name", "fistName can't be empty").notEmpty(),
    body("last_name", "lastName can't be empty").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "validation error",
      });
    }
    let newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    })
    newUser = await newUser.save();
    res.json({
      data: newUser,
      message: "OK",
    });
  }
);

router.put(
  "/:id",
  [
    body("email", "email must be valid").isEmail(),
    body("name", "name can't be empty").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "validation error",
      });
    }
    const user = await User.findByIdAndUpdate(req.params.id,{
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    } , { new: true });
    if (!user) {
      return res.status(404).json({
        data: null,
        message: "User not found",
      });
    }
    res.status(200).json({
      data: user,
      message: "User updated successfully",
    });
  }
);
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({
        data: null,
        message: "The user with the given id was not found.",
      });
  }
  res.json({
    data: user,
    message: "OK",
  });
});

module.exports = router;