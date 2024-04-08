import express, { Router, Request, Response } from "express";
import Moralis from "moralis";
import {
  check,
  validationResult,
  ValidationError,
  Result,
} from "express-validator";
import User from "../../models/User";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import auth from "../../middleware/auth";



const router: Router = express.Router();

// route: api/user/register
// description: user register
// method: POST and it's public
interface AuthRequest extends Request {
  user?: {
    _id: string;
    wallet: string;
    fullName: string,
    company: string,
    avatar: string,
    bio: string,
    socialLink: string
  };
}

router.post("/request-message", async (req: Request, res: Response) => {
  const { address, chain }  = req.body;

  try {
    const message = await Moralis.Auth.requestMessage({
      address: String(address),
      chain: 1,
      ...config.moralis,
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }

});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { message, signature } = req.body;

    const { address, profileId } = (
      await Moralis.Auth.verify({
        message,
        signature,
        networkType: 'evm',
      })
    ).raw;

    const _user = await User.findOne({ wallet: address });
    if (_user) {
      const token = await jwt.sign(
        { data: _user },
        config.jwtSecret,
        { expiresIn: 60 * 60 * 24 }
      )
      console.log("user signin------>", _user.fullName);
      res.json({ status: "SUCCESS", data: token });
    } else {
      res.json({ status: "NONE", data: "Not registered user, Please register!" })
    }
  } catch (err) {
    res.status(500).json({ status: "ERR", data: err })
    console.log(err);
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { message, signature, user } = req.body;

    const { address, profileId } = (
      await Moralis.Auth.verify({
        message,
        signature,
        networkType: 'evm',
      })
    ).raw;

    const _user = await User.findOne({ wallet: address });
    if (_user) {
      res.json({ status: 'EX', data: "Address already registered" })
    } else {
      await new User({ wallet: address, ...user, ip: '127.0.0.1' }).save();
      const token = await jwt.sign(
        { data: { wallet: address, ...user, ip: '127.0.0.1' } },
        config.jwtSecret,
        { expiresIn: 60 * 60 * 24 }
      );
      res.json({ status: "SUCCESS", data: token });
    }
  } catch (err) {
    res.status(500).json({ status: "ERR", data: err })
  }
});

router.get("/", auth, async (req: AuthRequest, res: Response) => {
  res.json({ data: req.user });
});

router.put("/", auth, async (req: AuthRequest, res: Response) => {
  try {
    await User.findOneAndUpdate ({ wallet: req.user.wallet }, { ...req.body }, {
      new: true,
      upsert: true,
    });
    res.json({ status: "SUCCESS" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


export default router;
