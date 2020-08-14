const { Router } = require("express");
const Trip = require("../models").trip;
const User = require("../models").user;
const Participant = require("../models").participant;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/", async (req, res, next) => {
  const allTrips = await Trip.findAll({
    include: [
      { model: User, as: "participant" },
      { model: User, as: "owner" },
    ],
  });
  res.send(allTrips);
});

router.get("/oneuser", authMiddleware, async (req, res, next) => {
  const userParticipatingInTrip = req.user.id;
  try {
    const userWithTrips = await User.findByPk(userParticipatingInTrip, {
      include: [{ model: Trip, as: "participant" }],
    });
    res.send(userWithTrips.participant);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.get("/:tripId", async (req, res, next) => {
  const tripId = req.params.tripId;
  try {
    const specificTrip = await Trip.findByPk(tripId, {
      include: [
        { model: User, as: "participant" },
        { model: User, as: "owner" },
      ],
    });
    if (specificTrip) {
      res.send(specificTrip);
    } else {
      res.status(404).send({ message: "Trip not found" });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

//post a new trip for logged in user
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      date,
      locationCity,
      locationProvince,
      lengthKM,
      numPeopleAllowed,
      typeBike,
      description,
      tempo,
      startingTime,
    } = req.body;
    if (
      !title ||
      !date ||
      !locationCity ||
      !locationProvince ||
      !lengthKM ||
      !numPeopleAllowed ||
      !typeBike ||
      !description ||
      !tempo ||
      !startingTime
    ) {
      res.status(400).send({
        message:
          "Please provide all the necessary properties to create a new trip (date, locationCity, locationProvince, lengthKM, numPeopleAllowed, typeBike, description, tempo, startingTime",
      });
    } else {
      const userCreatingTrip = req.user.id;
      const newTrip = await Trip.create({
        userId: userCreatingTrip,
        title,
        date,
        locationCity,
        locationProvince,
        lengthKM,
        numPeopleAllowed,
        typeBike,
        description,
        tempo,
        startingTime,
      });
      const newParticipant = await Participant.create({
        tripId: newTrip.id,
        userId: userCreatingTrip,
      });
      res.send(newTrip);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
