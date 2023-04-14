import { FacilityType } from "./facility";
import { JobType } from "./job";
import { UserType } from "./user";

export type PoolType = {
    id: string;
    title: string;
    facility?: FacilityType; // referrer to facility for billing
    description?: string;
    jobs?: JobType[]; // array of Jobs the Pool offers
    workers: UserType[]; // array of workers in the pool
    admins: UserType[]; // array of admins for the pool}
}