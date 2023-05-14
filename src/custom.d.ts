import { IUserDoc } from "./modules/rider/user.interfaces";

declare module "express-serve-static-core" {
  export interface Request {
    user: IUserDoc;
  }
}
