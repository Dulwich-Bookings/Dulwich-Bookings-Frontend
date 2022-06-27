import { Timezone } from '@/modules/DateTime/types';
export interface SchoolData {
  id: number;
  name: string;
  alternativeName?: string;
  timezone: Timezone;
}

export interface CreateSchoolData {
  name: string;
  alternativeName?: string;
  timezone: Timezone;
}

export type SchoolPutData = Partial<SchoolData>;
