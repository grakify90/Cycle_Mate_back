const { Router } = require("express");
const Topic = require("../models").topic;
const Reply = require("../models").reply;
const User = require("../models").user;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allTopics = await Topic.findAll({
      include: [{ model: Reply }],
    });
    res.send(allTopics);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:topicId", async (req, res, next) => {
  try {
    const topicId = req.params.topicId;
    const specificTopic = await Topic.findByPk(topicId, {
      include: [{ model: Reply }, { model: User }],
    });
    if (specificTopic) {
      res.send(specificTopic);
    } else {
      res.status(404).send({ message: "Topic not found" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
