const axios = require("axios");
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

//post a new trip for logged in user
router.post("/", authMiddleware, async (req, res, next) => {
  const {
    title,
    date,
    locationCity,
    locationProvince,
    streetName,
    streetNumber,
    postalCode,
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
    return;
  }

  //Using GeoCoding API to turn street+street number+postal code into coordinates
  let geoData;
  let precise;
  let locationDetails;
  try {
    const url = `https://eu1.locationiq.com/v1/search.php?key=946fe32ae8771d&q=${encodeURIComponent(
      streetName + " " + streetNumber + " " + postalCode + " " + "Netherlands"
    )}&format=json`;
    // If this request works, we will get detailed coordinates
    geoData = await axios.get(url);
    locationDetails = geoData.data[1].display_name;
    precise = true;
    const checkLocationCity = locationDetails.includes(locationCity);
    if (!checkLocationCity) {
      throw new Error();
    }
  } catch (error) {
    try {
      const url = `https://eu1.locationiq.com/v1/search.php?key=946fe32ae8771d&q=${encodeURIComponent(
        locationCity
      )}&format=json`;
      geoData = await axios.get(url);
      locationDetails = "";
      precise = false;
    } catch (error) {
      res.status(400).send({ message: "Not found." });
      return;
    }
  }

  //We've received the geoData, now we're going to use it to put coordinates in our new row
  const userCreatingTrip = req.user.id;
  const newTrip = await Trip.create({
    userId: userCreatingTrip,
    title,
    date,
    locationCity,
    locationProvince,
    precise: precise,
    locationDetails: locationDetails,
    latitude: parseFloat(geoData.data[1].lat),
    longitude: parseFloat(geoData.data[1].lon),
    lengthKM: parseInt(lengthKM),
    numPeopleAllowed: parseInt(numPeopleAllowed),
    typeBike,
    description,
    tempo,
    startingTime,
  });
  const newParticipant = await Participant.create({
    tripId: newTrip.id,
    userId: userCreatingTrip,
  });
  res.status(200).send(newTrip);
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

module.exports = router;
