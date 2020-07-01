import _ from "lodash";
import dotEnv from "dotenv";
import express from "express";
import { Express } from "express";
import { createServer, Server } from "http";

dotEnv.config();

_.forIn(
  {
    PORT: process.env.PORT,
  },
  (value: any, key: any) => {
    if (value === undefined || value === null || _.isEmpty(value)) {
      console.error(`The ${key} is no define in the .env`);
      process.exit(1);
    }
  }
);

const app: Express = express();
const http: Server = createServer(app);

http.listen(process.env.PORT, () => {
  console.log(
    " App is running at http://localhost:%d in %s mode",
    process.env.PORT,
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
