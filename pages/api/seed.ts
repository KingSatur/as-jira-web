import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import { Entry } from "../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "forbidden" });
  }

  await db.connect();

  await Entry.deleteMany();
  console.log(seedData.entries[0]);

  // await Entry.create(seedData?.entries[0]);
  await Entry.insertMany(seedData.entries);

  await db.disconnect();

  return res.status(201).json({ message: "Seed completed" });
}
