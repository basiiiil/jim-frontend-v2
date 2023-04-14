import { FacilityType } from "./facility";

export type DepartmentType = {
  id?: string;
  facility?: FacilityType;
  name?: string; // Department name
  status?: string; // status of department
};
