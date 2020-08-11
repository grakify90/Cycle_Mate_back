const { Router } = require("express");
const Topic = require("../models").topic;
const Reply = require("../models").reply;
const User = require("../models").user;

const router = new Router();

//fetch all topics, including the user who created the topic, and all the replies to that topic
router.get("/", async (req, res, next) => {
  try {
    const allTopics = await Topic.findAll({
      include: [{ model: Reply }, { model: User }],
    });
    res.send(allTopics);
  } catch (error) {
    console.log(error.message);
  }
});

//fetch one topic, including user who created the topic, and all the replies to that topic, including the users who created the replies
router.get("/:topicId", async (req, res, next) => {
  try {
    const topicId = req.params.topicId;
    const specificTopic = await Topic.findByPk(topicId, {
      include: [{ model: Reply, include: [User] }, { model: User }],
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
