import httpStatus from "http-status";
import mongoose from "mongoose";

import { ApiError } from "@dinedrop/shared";
import { IOptions, QueryResult } from "@dinedrop/shared";
import { IRiderDoc } from "./rider.interfaces";
import Rider from "./rider.model";

/**
 * Create a rider
 * @param {IRiderDoc} riderBody
 * @returns {Promise<IRiderDoc>}
 */
export const createRider = async (riderBody: IRiderDoc): Promise<IRiderDoc> => {
  return Rider.create(riderBody);
};

/**
 * Register a rider
 * @param {NewRegisteredRider} riderBody
 * @returns {Promise<IRiderDoc>}
 */
export const registerRider = async (
  riderBody: IRiderDoc
): Promise<IRiderDoc> => {
  return Rider.create(riderBody);
};

/**
 * Query for riders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryRiders = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const riders = await Rider.paginate(filter, options);
  return riders;
};

/**
 * Get rider by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IRiderDoc | null>}
 */
export const getRiderById = async (
  id: mongoose.Types.ObjectId
): Promise<IRiderDoc | null> => Rider.findById(id);

/**
 * Get rider by email
 * @param {string} email
 * @returns {Promise<IRiderDoc | null>}
 */
export const getRiderByEmail = async (
  email: string
): Promise<IRiderDoc | null> => Rider.findOne({ email });

/**
 * Update rider by id
 * @param {mongoose.Types.ObjectId} riderId
 * @param {UpdateRiderBody} updateBody
 * @returns {Promise<IRiderDoc | null>}
 */
export const updateRiderById = async (
  riderId: mongoose.Types.ObjectId,
  updateBody: IRiderDoc
): Promise<IRiderDoc | null> => {
  const rider = await getRiderById(riderId);
  if (!rider) {
    throw new ApiError(httpStatus.NOT_FOUND, "Rider not found");
  }
  Object.assign(rider, updateBody);
  await rider.save();
  return rider;
};

/**
 * Delete rider by id
 * @param {mongoose.Types.ObjectId} riderId
 * @returns {Promise<IRiderDoc | null>}
 */
export const deleteRiderById = async (
  riderId: mongoose.Types.ObjectId
): Promise<IRiderDoc | null> => {
  const rider = await getRiderById(riderId);
  if (!rider) {
    throw new ApiError(httpStatus.NOT_FOUND, "Rider not found");
  }
  await rider.deleteOne();
  return rider;
};
