import { USER_ACCOUNT_MODEL } from "../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export default {
  createAccount: async (req: any, res: any) => {
    try {
      const user = await USER_ACCOUNT_MODEL.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });

      if (user)
        return res.status(409).send({ message: "User already existed!" });

      bcrypt.genSalt(parseInt(process.env.BCRYPT_HASH!), (err, salt) => {
        if (!err)
          return bcrypt.hash(req.body.password, salt, async (err, hash) => {
            if (!err) {
              await USER_ACCOUNT_MODEL.create({
                email: req.body.email,
                username: req.body.username,
                password: hash,
              });
              return res.status(201).send({ message: "Account created!" });
            }
            console.log(err);
            return res.status(500).send({ message: "INTERNAL SERVER ERROR" });
          });
        console.log(err);
        return res.status(500).send({ message: "INTERNAL SERVER ERROR" });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "INTERNAL SERVER ERROR" });
    }
  },
  loginAccount: async (req: any, res: any) => {
    try {
      const user = await USER_ACCOUNT_MODEL.findOne({
        $or: [{ email: req.body.username }, { username: req.body.username }],
      });

      if (!user)
        return res.status(404).send({ message: "Invalid account credentials" });

      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (isMatch === false)
        return res.status(404).send({ message: "Invalid account credentials" });

      const token = jwt.sign(
        {
          user_id: user._id,
          user_email: user.email,
          username: user.username,
          verification_status: user.verificationStatus,
        },
        process.env.SECRET_KEY!
      );

      return res
        .status(200)
        .send({ message: "Account Login Successfully", token: token });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "INTERNAL SERVER ERROR" });
    }
  },
  sendVerification: async (req: any, res: any) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const user = await USER_ACCOUNT_MODEL.findOne({
        _id: req.body.userID,
      });

      if (!user)
        return res.status(404).send({ message: "Internal Server Error" });

      const verification_token = jwt.sign(
        {
          email: user.email,
        },
        process.env.NODEMAILER_SECRET_KEY!,
        { expiresIn: "1hr" }
      );

      const userIDToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.NODEMAILER_SECRET_KEY!,
        {
          expiresIn: "1h",
        }
      );

      user.verificationToken = verification_token;
      user.save();

      const url = `${process.env.ROOT_URL}/confirm-verification/${userIDToken}/${verification_token}`;

      let hasError = false;

      try {
        await transporter.sendMail({
          to: req.body.email,
          subject: "Verify Email",
          html: `Click <a href = "${url}">here</a> to verify your email.`,
        });

        hasError = false;
      } catch (error) {
        console.log(error);
        hasError = true;
        return res.status(500).send({
          message: `There is an error on sending verfication mail to ${user.email}, please try again.`,
        });
      }

      if (hasError === false) {
        return res
          .status(200)
          .send({ message: `Verification email was send to ${user.email}` });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  confirmVerification: async (req: any, res: any) => {
    try {
      const decoded: any = jwt.decode(req.body.idToken);

      const user = await USER_ACCOUNT_MODEL.findOne({
        _id: decoded.id,
      });

      if (!user) return res.status(404).send({ message: "Invalid User Token" });

      if (user.verificationToken !== req.body.userToken)
        return res.status(404).send({ message: "Invalid user token" });

      user.verificationToken = "";
      user.verificationStatus = true;
      user.save();

      return res.status(200).send({ message: "Account Verified" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
