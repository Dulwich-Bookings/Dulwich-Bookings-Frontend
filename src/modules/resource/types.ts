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
}

export interface CreateResourceData {
  name: string;
  description: string;
  accessRights: Role[];
  bookingRights: Role[];
  inAdvance: number;
  isBookingDescriptionOptional: boolean;
  schoolId: number;
}

export type ResourcePutData = Partial<ResourceData>;
