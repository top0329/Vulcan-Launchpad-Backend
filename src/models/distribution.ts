import mongoose, { Schema, Model, model, ObjectId } from "mongoose";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";

export interface IDistribution extends Document {
  distributor: string,
  ico: string,
  txHash: string,
  chainId: number
}
interface IDistributionModel extends Model<IDistribution> {}

const DistributionSchema: Schema = new Schema({
  distributor: {
    type: String,
    required: true,
  },
  ico: {
    type: String,
    required: true,
  },
  txHash: {
    type: String,
    required: true,
  },
  chainId: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now
  }

});

const Distribution: IDistributionModel = model<IDistribution, IDistributionModel>("Distribution", DistributionSchema);
export default Distribution;
