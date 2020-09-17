const router = require("express").Router();
const { TotalCasesbyDHB } = require("../ScrapeApi/ScrapeApi");
router.route("/dhbdata").get(async (req, res) => {
  const dhbdata = await TotalCasesbyDHB();
  return res.json(dhbdata);
});
module.exports = router;
