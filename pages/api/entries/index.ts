import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return await getEntries(res);
    case "POST":
      return await createEntry(req, res);
    case "PUT":
      return await createEntry(req, res);
    default:
      return res.status(404).json({ message: "Endpoint not found" });
  }
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;

  try {
    await db.connect();
    const entryEntity = await Entry.create({
      description,
      status: "pending",
    });

    await db.disconnect();

    return res.status(201).json(entryEntity);
  } catch (error) {
    console.log(error);

    await db.disconnect();
    return res.status(500).json({ message: "Something went wron" });
  }
};

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  const entries = await Entry.find().sort({ createdAt: "ascending" });

  await db.disconnect();

  return res.status(200).json(entries);
};
