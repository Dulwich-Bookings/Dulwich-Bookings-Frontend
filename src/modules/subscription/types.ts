export interface SubscriptionData {
  id: number;
  name: string;
  description: string;
  accessRights: string[];
  credentials: string;
  expiry: string;
  remindMe: boolean;
  schoolId: number;
}

export interface CreateSubscriptionData {
  name: string;
  description: string;
  accessRights: string[];
  credentials: string;
  expiry: string;
  remindMe: boolean;
  schoolId: number;
}

export type SubscriptionPutData = Partial<SubscriptionData>;
