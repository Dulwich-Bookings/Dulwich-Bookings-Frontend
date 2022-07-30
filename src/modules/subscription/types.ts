import { Role } from '@/modules/user/types';
import { SearchState } from '@/consts/constants';
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
  type: SearchState;
}

export interface CreateSubscriptionData {
  subscription: {
    name: string;
    description: string;
    accessRights: Role[];
    credentials: string;
    expiry?: DateTime;
    remindMe: boolean;
  };
  tags: number[];
  users: number[];
}

export interface SubscriptionPutData {
  subscription?: Partial<SubscriptionData>;
  tags: number[];
  users: number[];
}
