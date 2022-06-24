import { Role } from '@/modules/user/types';

export interface SubscriptionData {
  id: number;
  name: string;
  description: string;
  accessRights: Role[];
  credentials: string;
  expiry: Date;
  remindMe: boolean;
  schoolId: number;
}

export interface CreateSubscriptionData {
  name: string;
  description: string;
  accessRights: Role[];
  credentials: string;
  expiry: Date;
  remindMe: boolean;
  schoolId: number;
}

export type SubscriptionPutData = Partial<SubscriptionData>;
