const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const User = db.User;

const signup = async (req, res) => {
  try {
    const { name, type, email, password, teacher_id } = req.body;
    const data = {
      name,
      type,
      email,
      password: await bcrypt.hash(password, 10),
      teacher_id: type === "teacher" ? null : teacher_id,
    };
    const user = await User.create(data);

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

      const formatedUser = {
        id: user.id,
        type: user.type,
        email: user.email,
        name: user.name,
        user_programs_id: user.user_programs_id,
        teacher_id: user.teacher_id,
      };
      return res.status(201).send(formatedUser);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        const now = new Date(Date.now());
        const expiresInMilliseconds = 1 * 24 * 60 * 60 * 1000;
        const expirationTimestamp = now.getTime() + expiresInMilliseconds;

        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

        const userDataWithMeta = await user.getData();

        return res.status(201).send({
          ...userDataWithMeta,
          token: {
            value: token,
            expiresIn: expirationTimestamp,
          },
        });
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

const user = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).send("Unauthorized");
  } else {
    return res.send(user);
  }
};

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body.formatedData;

  console.log(currentPassword, newPassword, userId);

  if (!currentPassword || !newPassword || !userId) {
    return res.status(400).json({
      error: "User id, current password, and new password are required",
    });
  }

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isSame = await bcrypt.compare(currentPassword, user.password);
    if (!isSame) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const updatedPassword = await bcrypt.hash(newPassword, 10);
    const [updatedUser] = await User.update(
      { password: updatedPassword },
      {
        where: {
          id: userId,
        },
      }
    );

    if (updatedUser) {
      return res.status(200).json({ message: "Password updated successfully" });
    } else {
      return res.status(400).json({ error: "Failed to update password" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getCurrentStudents = async (req, res) => {
  const teacher_id = req.query.teacher_id;

  if (!teacher_id) {
    return res.status(400).json({ error: "teacher_id is required" });
  }

  try {
    const currentStudents = await User.findAll({
      where: {
        teacher_id: teacher_id,
      },
    });

    if (currentStudents.length > 0) {
      return res.status(200).json({ data: currentStudents });
    }
  } catch (error) {
    console.error("Error in getCurrentStudents:", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération des currentStudents." });
  }
};

module.exports = {
  signup,
  login,
  user,
  updatePassword,
  getCurrentStudents,
};
