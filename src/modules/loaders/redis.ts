import { ApiError, logger } from "@dinedrop/shared";
import config from "../../config/config";

import * as redis from "redis";

let client = redis.createClient(config.redisURI);

client.connect();

if (client.isOpen) {
  logger.info("Connected to redisDB");
} else {
  logger.error("Redis not connected!");
}

export function connectRedis() {
  if (!client.isOpen) {
    client.connect();
    logger.info("Connected to redisDB");
  }
}

export function disconnectRedis() {
  client.quit();
}

// Function to set a rider location in Redis
export async function setRiderLocation(
  riderId: string,
  point: {
    latitude: number;
    longitude: number;
  }
) {
  connectRedis();
  const res = await client.geoAdd("riders", [
    {
      member: riderId,
      longitude: point.longitude,
      latitude: point.latitude,
    },
  ]);
  logger.info("rider-location-update " + res);
}

// Function to get all the riders within a radius of a point in Redis
export async function getRidersWithinRadius(point: {
  latitude: number;
  longitude: number;
}): Promise<string[]> {
  connectRedis();
  const radius = 10000; // meters
  try {
    const nearbyRiders = client.geoRadius("riders", point, radius, "m");
    return nearbyRiders;
  } catch (err) {
    throw new ApiError(500, "Redis error: " + err);
  }
}

client.on("disconnect", onDisconnect);
client.on("error", onError);

function onDisconnect() {
  console.log("Redis disconnected!");
}

function onError(error: Error) {
  new ApiError(500, "Redis error: " + error.message);
}

export default client;
