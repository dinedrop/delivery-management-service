import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
// import { socketEvents } from "./event.enum";
import { setRiderLocation } from "../loaders/redis";
import { logger } from "@dinedrop/shared";

export const handleFindRide = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  console.log("A client connected to /find-ride");
  socket.on("update-rider-location", async (data: any) => {
    await setRiderLocation(data.riderId, data.point);
    logger.info("rider-location-update ");
  });
  socket.on("disconnect", () => {
    console.log("A client disconnected from /find-ride");
  });
};

export const authenticateRider = (
  _socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void
) => {
  /*
    authenticate the rider
  */
  next();
};
