import Joi from "joi";
import { objectId } from "@dinedrop/shared";

export const createRider = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    city: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri(),
    location: Joi.object({
      type: Joi.string(),
      coordinates: Joi.array().items(Joi.number()).length(2),
    }).optional(),
  }),
};

export const updateRider = {
  params: Joi.object().keys({
    riderId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    city: Joi.string(),
    description: Joi.string(),
    image: Joi.string().uri(),
    location: Joi.object({
      type: Joi.string(),
      coordinates: Joi.array().items(Joi.number()).length(2),
    }).optional(),
  }),
};

export const deleteRider = {
  params: Joi.object().keys({
    riderId: Joi.string().custom(objectId),
  }),
};

export const getRiderById = {
  params: Joi.object().keys({
    riderId: Joi.string().custom(objectId),
  }),
};

export const getRiders = {
  query: Joi.object().keys({
    point: Joi.object({
      type: Joi.string(),
      coordinates: Joi.array().items(Joi.number()).length(2),
    }).required(),
    radius: Joi.number().required(),
  }),
};
