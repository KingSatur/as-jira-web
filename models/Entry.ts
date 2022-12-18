import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces";

export interface IEntry extends Entry {}

const entrySchema = new Schema(
  {
    description: { type: String, required: true },
    status: {
      type: String,
      enum: {
        values: ["pending", "progress", "finished"],
        message: "{VALUE} is not allowed",
        default: "pending",
      },
    },
  },
  {
    timestamps: true,
  }
);

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
