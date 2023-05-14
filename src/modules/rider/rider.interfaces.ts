import { Document, Model } from "mongoose";

import { QueryResult } from "@dinedrop/shared";

export interface IRider extends Document {
  name: string;
  city: string;
  description: string;
  image: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IRiderDoc extends IRider, Document {}

export interface IRiderModel extends Model<IRiderDoc> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}
