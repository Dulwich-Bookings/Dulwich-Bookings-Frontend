import { Roles } from '@/modules/user/types';

export interface ResourceData {
  id: number;
  name: string;
  description: string;
  accessRights: Roles[];
  bookingRights: Roles[];
  inAdvance: number;
  isBookingDescriptionOptional: boolean;
  schoolId: number;
}

export interface CreateResourceData {
  name: string;
  description: string;
  accessRights: Roles[];
  bookingRights: Roles[];
  inAdvance: number;
  isBookingDescriptionOptional: boolean;
  schoolId: number;
}

export type ResourcePutData = Partial<ResourceData>;
