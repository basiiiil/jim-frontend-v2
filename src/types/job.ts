import { ExperienceType } from "./experience";
import { FacilityType } from "./facility";

export type JobType = {
  id?: string;
  title?: string; // Job title
  requirements?: ExperienceType[]; // required skills for this job
  sugg_descr?: string; // suggested job description
  author?: FacilityType; // job description
  facility?: FacilityType; // job facility
};
