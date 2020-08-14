const { Router } = require("express");
const Topic = require("../models").topic;
const Reply = require("../models").reply;
const User = require("../models").user;
const authMiddleware = require("../auth/middleware");

const router = new Router();

//post a new reply to specific topic for logged in user
router.post("/:topicId", authMiddleware, async (req, res, next) => {
  try {
    const topicId = req.params.topicId;
    const { content, imageUrl } = req.body;
    if (!content) {
      res.status(400).send({ message: "Please provide content for reply" });
    } else {
      const userMakingReply = req.user.id;
      const newReply = await Reply.create({
        userId: userMakingReply,
        topicId: topicId,
        content,
        imageUrl,
      });
      const replyWithUser = await Reply.findByPk(newReply.id, {
        include: { model: User },
      });

      res.send(replyWithUser);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

//updating a reply for logged in user
router.patch("/:replyId", authMiddleware, async (req, res, next) => {
  try {
    const replyToBeUpdatedId = req.params.replyId;
    const userMakingReply = req.user.id;
    const replyToBeUpdated = await Reply.findByPk(replyToBeUpdatedId);
    if (userMakingReply === replyToBeUpdated.userId) {
      const updatedReply = await replyToBeUpdated.update({
        ...req.body,
        userId: userMakingReply,
      });
      res.send(updatedReply);
    } else {
      res
        .status(401)
        .send({ message: "Only reply creator can make changes to the reply" });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.delete("/:replyId", authMiddleware, async (req, res, next) => {
  try {
    const replyToBeDeletedId = req.params.replyId;
    const userDeletingReply = req.user.id;
    const replyToBeDeleted = await Reply.findByPk(replyToBeDeletedId);
    if (userDeletingReply === replyToBeDeleted.userId) {
      const deletedReply = await replyToBeDeleted.destroy();
      res.send(deletedReply);
    } else {
      res
        .status(401)
        .send({ message: "Only reply creator can delete his/her own reply" });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
