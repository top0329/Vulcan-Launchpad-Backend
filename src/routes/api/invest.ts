import express, { Router, Request, Response } from "express";

import {
  check,
  validationResult,
  ValidationError,
  Result,
} from "express-validator";
import Distribution from "../../models/distribution";
import Refund from "../../models/refund";


const router: Router = express.Router();

// route: /api/ico/invest/distribution
// description: distribution register
// method: POST and it's public

router.post("/distribution", async (req: Request, res: Response) => {
  const { distributor, chainId, txHash, ico }  = req.body;
  try {
    if (!distributor || !chainId || !txHash || !ico) throw "none";
    console.log(">>>>refund add", { txHash, ico });

    new Distribution({
        distributor,
        ico,
        chainId,
        txHash,
    }).save();
    res.status(200).json("success");
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

router.get("/distribution", async (req: Request, res: Response) => {
  const distributor: string = req.query.distributor as string;
  const ico: string = req.query.ico as string;

  try {
    if (!distributor || !ico) throw "none";
    console.log(">>>>distribution add", { distributor, ico });
    
    const distribution = await Distribution.findOne({ ico, distributor })
    res.status(200).json(distribution);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

// route: /api/ico/invest/refund
// description: refund register
// method: POST and it's public

router.post("/refund", async (req: Request, res: Response) => {
  const { refunder, chainId, txHash, ico }  = req.body;
  try {
    if (!refunder || !chainId || !txHash || !ico) throw "none";
    console.log(">>>>refund add", { txHash, ico });
    new Refund({
        refunder,
        ico,
        chainId,
        txHash,
    }).save();
    res.status(200).json("success");
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

router.get("/refund", async (req: Request, res: Response) => {
  const refunder: string = req.query.refunder as string;
  const ico: string = req.query.ico as string;
  try {
    const distribution = await Refund.findOne({ ico, refunder })
    res.status(200).json(distribution);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});






export default router;
