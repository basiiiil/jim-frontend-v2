import { ExperienceType } from "./experience";
import { UserType } from "./user";

export type ExperienceInstanceType = {
  id?: string;
  experience?: ExperienceType; // experience details
  date?: Date; // date of commencement
  verification?: string; // file link for verification on aws s3
  status?: string;
  user?: UserType;
};
