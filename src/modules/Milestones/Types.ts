import DateTime from '@/modules/DateTime/DateTime';

export interface MilestoneData {
  id: number;
  schoolId: number;
  week: number;
  weekBeginning: DateTime;
}

export interface CreateMilestoneData {
  week: number;
  weekBeginning: string;
}

export interface MilestoneFormData {
  id: number;
  week: number;
  weekBeginning: Date;
}
