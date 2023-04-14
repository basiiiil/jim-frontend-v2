import { DepartmentType } from "./department";
import { JobType } from "./job";
import { PoolType } from "./pool";
import { UserType } from "./user";

export type JobInstanceType = {
    status?: string;
    department: DepartmentType;
    worker?: UserType | null; // ID of user, who accepted the job
    start_time: number;
    end_time: number; // estimated end time
    actual_end_time?: number; // time when job really ended
    actual_start_time?: number; // time when job really started
    length: number;
    pay?: number; // what jim is payed for the job
    cost?: number; // what jim pays the user for the job
    job: JobType; // required skills for this job
    description?: string;
    pool?: PoolType; // pool for this job
    group_id?: string; // JobInstance group
    instant_book?: boolean; // boolean to show, whether job can be booked instantly or needs facility confirmation
}