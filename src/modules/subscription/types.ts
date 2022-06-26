import { Role } from '@/modules/user/types';
import DateTime from '@/modules/DateTime/DateTime';

export interface SubscriptionData {
  id: number;
  name: string;
  description: string;
  accessRights: Role[];
  credentials: string;
  expiry?: DateTime;
  remindMe: boolean;
  schoolId: number;
}

export interface CreateSubscriptionData {
  name: string;
  description: string;
  accessRights: Role[];
  credentials: string;
  expiry?: DateTime;
  remindMe: boolean;
  schoolId: number;
}

export type SubscriptionPutData = Partial<SubscriptionData>;
