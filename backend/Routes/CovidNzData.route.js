const router = require("express").Router();
const { covid19TotalCount } = require("../ScrapeApi/ScrapeApi");

router.route("/").get(async (req, res) => {
  const caseResult = await covid19TotalCount();
  return res.json(caseResult);
});

module.exports = router;
