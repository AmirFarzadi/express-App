const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render('home',{name: 'Amir'})
});

module.exports = router;