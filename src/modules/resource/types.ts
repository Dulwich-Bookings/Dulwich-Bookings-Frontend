export interface ResourceData {
  id: number;
  name: string;
  description: string;
  accessRights: string[];
  bookingRights: string[];
  inAdvance: number;
  isBookingDescriptionOptional: boolean;
  schoolId: number;
}

export interface CreateResourceData {
  name: string;
  description: string;
  accessRights: string[];
  bookingRights: string[];
  inAdvance: number;
  isBookingDescriptionOptional: boolean;
  schoolId: number;
}

export type ResourcePutData = Partial<ResourceData>;
