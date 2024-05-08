import mongoose, { Schema, Model, model, ObjectId, InferSchemaType } from "mongoose";

interface IVulcan {
  project: {
    title: string,
    description: string
  },
  token: {
    name: string,
    symbol: string,
    totalSupply: number,
    tokenAddress: number,
    decimal: number,
    price: number
  },
  creator: string,
  ico: string,
  softcap: number,
  hardcap: number,
  startTime: number,
  endTime: number,
  tokenAddress: string,
  lister: string,
  distributor: string,
  refunder: string,
  status: number,
  investments: [{
    investor: string,
    contributor: string,
    amount: string
  }],
  contributions: [{
    contributor: string,
    amount: string
  }]
}

const schema = new Schema<IVulcan>({
  project: {
    title: String,
    description: String
  },
  token: {
    name: String,
    symbol: String,
    totalSupply: Number,
    tokenAddress: Number,
    decimal: Number,
    price: Number,
  },
  creator: String,
  ico: String,
  softcap: Number,
  hardcap: Number,
  startTime: Number,
  endTime: Number,
  tokenAddress: String,
  lister: String,
  distributor: String,
  refunder: String,
  status: Number,
  investments: [{
    investor: String,
    contributor: String,
    amount: String
  }],
  contributions: [{
    contributor: String,
    amount: String
  }]
});

type User = InferSchemaType<typeof schema>;
const VulcanModel = mongoose.model('Vulcan', schema);
export default VulcanModel;