const { Router } = require("express");
const Topic = require("../models").topic;
const Reply = require("../models").reply;
const User = require("../models").user;
const authMiddleware = require("../auth/middleware");

const router = new Router();

//fetch all topics, including the user who created the topic, and all the replies to that topic
router.get("/", async (req, res, next) => {
  try {
    const allTopics = await Topic.findAll({
      include: [{ model: Reply }, { model: User }],
    });
    res.send(allTopics);
  } catch (error) {
    return res.status(400).send(error.message);
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
    return res.status(400).send(error.message);
  }
});

//post a new topic for logged in user
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { title, content, imageUrl } = req.body;
    if (!title || !content) {
      res
        .status(400)
        .send({ message: "Please provide a title and content for topic" });
    } else {
      const userOwningTopic = req.user.id;
      const newTopic = await Topic.create({
        userId: userOwningTopic,
        title,
        content,
        imageUrl,
      });
      const topicWithUser = await Topic.findByPk(newTopic.id, {
        include: { model: User },
      });

      res.send(topicWithUser);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

//updating a topic for logged in user
router.patch("/:topicId", authMiddleware, async (req, res, next) => {
  try {
    const topicToBeUpdatedId = req.params.topicId;
    const userOwningTopic = req.user.id;
    const topicToBeUpdated = await Topic.findByPk(topicToBeUpdatedId);
    if (userOwningTopic === topicToBeUpdated.userId) {
      const updatedTopic = await topicToBeUpdated.update({
        ...req.body,
        userId: userOwningTopic,
      });
      res.send(updatedTopic);
    } else {
      res
        .status(401)
        .send({ message: "Only topicstarter can make changes to the topic" });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
