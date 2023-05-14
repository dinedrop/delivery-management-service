import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const handleTrackDelivery = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  console.log("A client connected to /delivery");

  socket.on("message", (data) => {
    console.log(`Received message on /delivery: ${data}`);
    // Handle the message data here
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected from /delivery");
  });
};

export const authenticateDelivery = (
  _socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void
) => {
  /*
    authenticate delivery
  */
  next();
};
