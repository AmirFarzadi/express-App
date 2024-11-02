const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
let users = require("../data.js");


router.get("/", (req, res) => {
  res.json({
    data: users,
    message: "OK",
  })
});


router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
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
    body("name", "name can't be empty").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "validation error",
      });
    }
    users.push({
      id: users.length + 1,
      ...req.body,
    });
    res.json({
      data: users,
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
  (req, res) => {
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({
        data: null,
        message: "User not found",
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "validation error",
      });
    }
    users = users.map((user) => {
      if (user.id === parseInt(req.params.id)) {
        return { ...user, ...req.body };
      }
      return user;
    });
    res.status(200).json({
      data: users,
      message: "User updated successfully",
    });
  }
);
router.delete("/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res
      .status(404)
      .json({
        data: null,
        message: "The user with the given id was not found.",
      });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  res.json({
    data: users,
    message: "OK",
  });
});

module.exports = router;