import fs from "fs";

export default defineEventHandler(async () => {
  return await fs.readFileSync(`app/server/api/memosuku.bak`, `utf-8`);
});
