const { Router } = require("express");
const Trip = require("../models").trip;
const User = require("../models").user;
const Participant = require("../models").participant;
const authMiddleware = require("../auth/middleware");

const router = new Router();

//create a new participant (user him/herself) for specific trip
router.post("/:tripId", authMiddleware, async (req, res, next) => {
  try {
    const userParticipantId = req.user.id;
    const tripId = req.params.tripId;
    const userAlreadyParticipant = await Participant.findAll({
      where: { userId: userParticipantId, tripId: tripId },
    });
    if (userAlreadyParticipant.length > 0) {
      res
        .status(400)
        .send({ message: "User is already a participant in this trip" });
    } else {
      const newParticipant = await Participant.create({
        tripId: tripId,
        userId: userParticipantId,
      });
      res.send(newParticipant);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

//delete participant (user him/herself) for specific trip
router.delete("/:tripId", authMiddleware, async (req, res, next) => {
  try {
    const userParticipantId = req.user.id;
    const tripId = req.params.tripId;
    const participantToBeDeleted = await Participant.findOne({
      where: { userId: userParticipantId, tripId: tripId },
    });
    const deletedParticipant = await participantToBeDeleted.destroy();
    res.send(deletedParticipant);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
