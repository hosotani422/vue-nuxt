import fs from "fs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  fs.writeFileSync(`app/server/api/${body.name}`, body.data);
});
