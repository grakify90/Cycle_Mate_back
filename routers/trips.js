const { Router } = require("express");
const Trip = require("../models").trip;
const User = require("../models").user;

const router = new Router();

router.get("/", async (req, res, next) => {
  const allTrips = await Trip.findAll({
    include: [
      { model: User, as: "participants" },
      { model: User, as: "owner" },
    ],
  });
  res.send(allTrips);
});

module.exports = router;
