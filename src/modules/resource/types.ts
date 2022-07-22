import { Role } from '@/modules/user/types';

export interface ResourceData {
  id: number;
  name: string;
  description: string;
  accessRights: Role[];
  bookingRights: Role[];
  inAdvance: number;
  isBookingDescriptionOptional: boolean;
  schoolId: number;
  weekProfile: 'Weekly' | 'BiWeekly';
  type: 'resource';
}

export interface CreateResourceData {
  resource: {
    name: string;
    description: string;
    accessRights: Role[];
    bookingRights: Role[];
    inAdvance: number;
    isBookingDescriptionOptional: boolean;
    weekProfile: 'Weekly' | 'BiWeekly';
  };
  tags: number[];
  users: number[];
}

export interface ResourcePutData {
  resource?: Partial<ResourceData>;
  tags: number[];
  users: number[];
}

export interface ResourceMappings {
  id: number;
  resource_id: number;
  subscription_id: number;
  user_id: number;
}
