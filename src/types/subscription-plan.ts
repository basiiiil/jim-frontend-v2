export type SubscriptionPlanType = {
  id?: string;
  title?: string;
  description?: string; // description of subscription plan
  stripe_id?: string; // id of stripe price for the product
  status?: string; // status of the subscription
  monthly_active_users?: number; // field for allowed monthly active users
  limits?: {
    metric?: string;
    limit?: number;
  }[];
  price?: number; // monthly price for plan
};
