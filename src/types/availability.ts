import { UserType } from "./user";

export type AvailabilityType = {
    id?: string;
    start_time?: number;
    end_time?: number;
    worker?: UserType;
    instant_book?: boolean;
  }