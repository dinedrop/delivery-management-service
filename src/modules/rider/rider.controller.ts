import { Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";

import { ApiError } from "@dinedrop/shared";
import { IOptions } from "@dinedrop/shared";
import { catchAsync } from "@dinedrop/shared";
import { pick } from "@dinedrop/shared";
import * as riderService from "./rider.service";
import { getRidersWithinRadius } from "../loaders/redis";

export const createRider = catchAsync(async (req: Request, res: Response) => {
  const rider = await riderService.createRider(req.body);
  res.status(httpStatus.CREATED).send(rider);
});

export const getRiders = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "role"]);
  const options: IOptions = pick(req.query, [
    "sortBy",
    "limit",
    "page",
    "projectBy",
  ]);
  const result = await riderService.queryRiders(filter, options);
  res.send(result);
});

export const getRider = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["riderId"] === "string") {
    const rider = await riderService.getRiderById(
      new mongoose.Types.ObjectId(req.params["riderId"])
    );
    if (!rider) {
      throw new ApiError(httpStatus.NOT_FOUND, "Rider not found");
    }
    res.send(rider);
  }
});

export const updateRider = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["riderId"] === "string") {
    const rider = await riderService.updateRiderById(
      new mongoose.Types.ObjectId(req.params["riderId"]),
      req.body
    );
    res.send(rider);
  }
});

export const deleteRider = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["riderId"] === "string") {
    await riderService.deleteRiderById(
      new mongoose.Types.ObjectId(req.params["riderId"])
    );
    res.status(httpStatus.NO_CONTENT).send();
  }
});

export const getNearByRiders = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.body.point);
    const riders = await getRidersWithinRadius(req.body.point);

    if (!riders) {
      throw new ApiError(httpStatus.NOT_FOUND, "No riders found!");
    }
    res.status(201).send({ data: riders, message: "riders found!" });
  }
);
