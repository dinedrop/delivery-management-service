import mongoose from "mongoose";

import app from "./app";
import config from "./config/config";
import { logger } from "@dinedrop/shared";
import { setupWebSocket } from "./modules/loaders/ws";
import { handleFindRide, handleTrackDelivery } from "./modules/socket";

// Initialize Redis
import "./modules/loaders/redis";
import { authenticateRider } from "./modules/socket/find-ride.event";
import { authenticateDelivery } from "./modules/socket/track-delivery.event";
import { createServer } from "http";

mongoose.connect(config.mongoose.url).then(() => {
  logger.info("Connected to MongoDB");
});

const httpServer = createServer(app);

const io = setupWebSocket(httpServer);

const findRideNameSpace = io.of("/find-ride");
findRideNameSpace.use(authenticateRider);
findRideNameSpace.on("connection", handleFindRide);

const trackOrderNamespace = io.of("/track-delivery");
findRideNameSpace.use(authenticateDelivery);
trackOrderNamespace.on("connection", handleTrackDelivery);

httpServer.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const exitHandler = () => {
  if (httpServer) {
    httpServer.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (httpServer) {
    httpServer.close();
  }
});
