import { AddressType } from "./address";
import { DepartmentType } from "./department";
import { PoolType } from "./pool";
import { SubscriptionType } from "./subscription";
import { UserType } from "./user";

type UserWithRole = {
  user?: UserType;
  role: string;
};

export type FacilityType = {
  id?: string;
  name?: string;
  address?: AddressType;
  departments?: DepartmentType[]; // array of depts the facility has
  pools?: PoolType[];
  billing?: {
    stripe_customer_id: string; // Stripe customer ID
    current_subscription: SubscriptionType; // current subscription plan
  };
  status?: string; // status of user
  users?: UserWithRole[]; // array of user with roles for the department
};
