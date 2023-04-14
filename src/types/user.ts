import { AddressType } from "./address";
import { ExperienceInstanceType } from "./experience-instance";
import { FacilityType } from "./facility";
import { JobType } from "./job";

export type UserType = {
  id?: string;
  auth0_id?: string; // Auth0 id to identify user
  last_name?: string; // Last name
  first_name?: string; // First name
  email?: string; // email adress
  status?: "PENDING" | "BANNED" | "ACTIVE"; // status of user
  picture?: string; // profile picture link for aws S3
  verification?: string; // photo-id link for aws S3 verification id
  sign_up?: Date; // sign up date
  date_of_birth?: Date; // date of birth
  phone?: string; // phone number
  phone2?: string; // secondary phone number
  address?: AddressType; // user home adress
  roles?: "ADMIN" | "WORKER" | "EMPLOYER"[]; // roles of user
  tax_id?: string; // user tax-credentials
  subscribed_jobs?: JobType[]; // Array of jobs, the user wants to do/is allowed to do
  facilities?: FacilityType[]; // array of facilities the user has permission to manage
  expInstances?: ExperienceInstanceType[]; // array of submitted experienceInstances
  calendar?: string; // user calendar URL
};
