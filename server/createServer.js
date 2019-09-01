import express from "express";
import bodyParser from "body-parser";

import { restRouter } from "./api/router";
import { signin, protectApi } from "./auth";

// expressApp is top level app declared from express
const expressApp = express();

expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());

// Routing
expressApp.use("/api", protectApi, restRouter);
expressApp.use("/signin", signin);

export default expressApp;
