const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    aboutMe,
    gender,
    dateOfBirth,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !aboutMe ||
    !gender ||
    !dateOfBirth
  ) {
    return res
      .status(400)
      .send(
        "Please provide a first name, last name, email, password, about me, gender and date of birth."
      );
  }

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      aboutMe,
      gender,
      dateOfBirth,
    });

    delete newUser.dataValues["password"];

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send(error.message);
  }
});

//update my user info
//http PATCH localhost:4000/update/1 Authorization:"Bearer token" lastName=Kato
router.patch("/update", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const userToBeUpdated = await User.findByPk(userId);
  const { firstName, lastName, aboutMe, gender, dateOfBirth } = req.body;

  try {
    const updatedUser = await userToBeUpdated.update({
      firstName,
      lastName,
      aboutMe,
      gender,
      dateOfBirth,
    });

    const token = toJWT({ userId: userId });

    res.status(201).send({ token, ...updatedUser.dataValues });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

//update password user
//http PATCH localhost:4000/updatepassword/1 Authorization:"Bearer token" password=secret
router.patch("/updatepassword", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const userToBeUpdated = await User.findByPk(userId);
  const { password } = req.body;

  try {
    const updatedUser = await userToBeUpdated.update({
      ...{ password: bcrypt.hashSync(password, SALT_ROUNDS) },
    });
    res.send(updatedUser);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues });
});

module.exports = router;
