import { Role } from '@/modules/user/types';
import { Moment } from 'moment';

export interface SubscriptionData {
  id: number;
  name: string;
  description: string;
  accessRights: Role[];
  credentials: string;
  expiry: Moment;
  remindMe: boolean;
  schoolId: number;
}

export interface CreateSubscriptionData {
  name: string;
  description: string;
  accessRights: Role[];
  credentials: string;
  expiry: Moment;
  remindMe: boolean;
  schoolId: number;
}

export type SubscriptionPutData = Partial<SubscriptionData>;
