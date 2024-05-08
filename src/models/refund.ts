import mongoose, { Schema, Model, model, ObjectId } from "mongoose";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";

export interface IRefund extends Document {
  refunder: string,
  ico: string,
  txHash: string,
  chainId: number
}
interface IRefundModel extends Model<IRefund> {}

const RefundSchema: Schema = new Schema({
  refunder: {
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

const Refund: IRefundModel = model<IRefund, IRefundModel>("Refund", RefundSchema);


export default Refund;
