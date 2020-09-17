const router = require("express").Router();
const { covid19TotalOverTime } = require("../ScrapeApi/ScrapeApi");
router.route("/stats").get(async (req, res) => {
  const overData = await covid19TotalOverTime();
  return res.json(overData);
  //  Nzdata.find()
  // .then(caseResult => res.json(caseResult))
  // .catch(err => res.status(400).json('Error: ' + err))
});
module.exports = router;
