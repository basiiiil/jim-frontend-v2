import { FacilityType } from "./facility";
import { SubscriptionPlanType } from "./subscription-plan";

export type SubscriptionType = {
  id?: string;
  facility?: FacilityType;
  start?: number; // start date of subscription
  end?: number; // end date of subscription
  stripe_id?: string; // id of stripe subscription
  plan?: SubscriptionPlanType; // link to plan details
  status?: string; // status of the subscription
};
