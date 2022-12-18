interface SeedData {
  entries: EntrySeed[];
}

interface EntrySeed {
  createdAt: number;
  description: string;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      createdAt: Date.now(),
      description:
        "[Finished] Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae dolorem qui facilis laboriosam alias veritatis amet pariatur consequuntur at repellat eum deleniti cupiditate impedit explicabo, distinctio ea voluptate eveniet consectetur.",
      status: "finished",
    },
    {
      createdAt: Date.now(),
      description:
        "[pending] Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae dolorem qui facilis laboriosam alias veritatis amet pariatur consequuntur at repellat eum deleniti cupiditate impedit explicabo, distinctio ea voluptate eveniet consectetur.",

      status: "pending",
    },
    {
      createdAt: Date.now(),
      description:
        "[progress] Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae dolorem qui facilis laboriosam alias veritatis amet pariatur consequuntur at repellat eum deleniti cupiditate impedit explicabo, distinctio ea voluptate eveniet consectetur.",
      status: "progress",
    },
  ],
};
