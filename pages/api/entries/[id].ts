import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { Entry } from "../../../models";

type Data = {
  message: string;
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "invalid id" });
  }

  switch (req.method) {
    case "PUT":
      return await updateEntry(req, res);
    case "GET":
      return await getEntry(req, res);
    case "DELETE":
      return await deleteEntry(req, res);
    default:
      return res.status(400).json({ message: "Method does not exist" });
  }
}

async function deleteEntry(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query;
  try {
    await db.connect();

    const entry = await Entry.findByIdAndDelete(id);

    await db.disconnect();
    return res.status(200).json(entry);
  } catch (error) {
    console.log("Error", error);
    await db.disconnect();
    return res.status(500).json({ message: "Server error" });
  }
}

async function getEntry(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query;

  try {
    await db.connect();

    const entry = await Entry.findById(id);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    await db.disconnect();
    return res.status(200).json(entry);
  } catch (error) {
    console.log("Error", error);
    await db.disconnect();
    return res.status(500).json({ message: "Bad request" });
  }
}

async function updateEntry(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query;

  try {
    await db.connect();

    const entry = await Entry.findById(id);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    const { description = entry?.description, status = entry?.status } =
      req.body;

    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { new: true, runValidators: true }
    );

    await db.disconnect();

    return res.status(200).json(updatedEntry);
  } catch (error) {
    console.log("Error", error);
    await db.disconnect();
    return res.status(500).json({ message: "Bad request" });
  }
}
