const router = require("express").Router();
const { genderAffected } = require("../ScrapeApi/ScrapeApi");
router.route("/agegroup-gender-affected").get(async (req, res) => {
  const genderData = await genderAffected();
  return res.json(genderData);
});
module.exports = router;
