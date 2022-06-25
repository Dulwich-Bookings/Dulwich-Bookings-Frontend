export interface SchoolData {
  id: number;
  name: string;
  timezone: Timezone;
}

export interface CreateSchoolData {
  name: string;
  timezone: Timezone;
}

export type SchoolPutData = Partial<SchoolData>;

export type Timezone = 'Asia/Shanghai' | 'Asia/Seoul' | 'Asia/Singapore' | 'Europe/London';
