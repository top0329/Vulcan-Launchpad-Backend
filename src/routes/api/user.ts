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
    website: string,
    twitter: string,
    linkedin: string,
    facebook: string,
    instagram: string,
    farcaster: string,
    lens: string,
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
      const _data = {
        wallet: _user.wallet,
        fullName: _user.fullName,
        company: _user.company,
        ip: _user.ip,
        avatar: _user.avatar
      }
      const token = await jwt.sign(
        { data: _data },
        config.jwtSecret,
        { expiresIn: 60 * 60 * 24 }
      );
      console.log("user signin------>", _user.fullName);
      res.status(200).json(token);
    } else {
      res.status(200).json("none");
    }
  } catch (err) {
    res.status(500).json({ status: "ERR", data: err })
    console.log(err);
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { message, signature, user } = req.body;
    console.log("user->", user);

    const { address, profileId } = (
      await Moralis.Auth.verify({
        message,
        signature,
        networkType: 'evm',
      })
    ).raw;

    const _user = await User.findOne({ wallet: address });
    if (_user) {
      res.status(200).json("exists");
    } else {
      await new User({ wallet: address, ...user, ip: '127.0.0.1' }).save();
      const _data = {
        wallet: address,
        fullName: user.fullName,
        company: user.company,
        ip: '127.0.0.1',
        avatar: user.avatar
      }
      const token = await jwt.sign(
        { data: _data },
        config.jwtSecret,
        { expiresIn: 60 * 60 * 24 }
      );
      res.status(200).json(token);
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("user->", id);
    const _user = await User.findOne({ wallet: id });
    res.json(_user);
  } catch (err) {
    res.status(500).json({ status: "ERR", data: err })
  }
});

router.get("/", auth, async (req: AuthRequest, res: Response) => {
  res.json({ data: req.user });
});

router.put("/", auth, async (req: AuthRequest, res: Response) => {
  console.log("update user->", req.user.wallet);
  try {
    await User.findOneAndUpdate ({ wallet: req.user.wallet }, { ...req.body }, {
      new: true,
      upsert: true,
    });
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


export default router;
