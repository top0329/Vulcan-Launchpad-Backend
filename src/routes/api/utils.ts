import express, { Router, Request, Response } from "express";
import {
  check,
  validationResult,
  ValidationError,
  Result,
} from "express-validator";
import axios from 'axios';

const router: Router = express.Router();

router.get("/eth-price", async (req: Request, res: Response) => {
  try {
    const headers = {
      'x-api-key': '2eDS3r6N5KZTEdOGuKRfqVzTyuQ',
      'accept': 'application/json'
    }
    const { data: { data } } = await axios.get(`https://api.coinbase.com/v2/prices/ETH-USD/buy`, { headers });
    res.json(data);
  } catch (err) {
    res.status(404).json("none");
  }
});



export default router;
