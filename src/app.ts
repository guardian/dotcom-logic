import express, { Application, Request, Response } from "express";

import { onwardsRoute } from "./routes";

import { PORT } from "./config";

const app: Application = express();

// Express configuration
app.set("port", PORT);
app.use(express.json({ limit: "50mb" }));
app.disable("x-powered-by");

app.get("/healthcheck", (req: Request, res: Response) =>
  res.send({ status: "okay" })
);

app.get("/onwards/*", onwardsRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
