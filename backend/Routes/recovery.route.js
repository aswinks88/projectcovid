const router = require("express").Router();
const { recoveryDataCount } = require("../ScrapeApi/ScrapeApi");
router.route("/recovery").get(async (req, res) => {
  const recoveryData = await recoveryDataCount();
  return res.json(recoveryData);
});
module.exports = router;
