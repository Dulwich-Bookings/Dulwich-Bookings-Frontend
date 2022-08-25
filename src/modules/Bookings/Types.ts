import { RRule } from 'rrule';

export type BookingTypes = 'Booking' | 'Lesson';
export const BookingType = {
  BOOKING: 'Booking' as BookingTypes,
  LESSON: 'Lesson' as BookingTypes,
};

export type BookingStates = 'Approved' | 'Pending';
export const BookingState = {
  APPROVED: 'Approved' as BookingStates,
  PENDING: 'Pending' as BookingStates,
};

export type RecurringTypes = 'Weekly' | 'BiWeekly' | 'None';
export const RecurringType = {
  NONE: 'None' as RecurringTypes,
  WEEKLY: 'Weekly' as RecurringTypes,
  BIWEEKLY: 'BiWeekly' as RecurringTypes,
};

export type EventType = 'Single' | 'Recurring' | 'None';
export const EventType = {
  SINGLE: 'Single' as EventType,
  RECURRING: 'Recurring' as EventType,
  NONE: 'None' as EventType,
};

export interface EventData {
  id: string;
  userId: number;
  title: string;
  formLabel: string;
  start: Date;
  end: Date;
  duration?: Duration;
  description: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  editable: boolean;
  rrule?: string;
  bookingType: BookingTypes;
  bookingState: BookingStates;
  eventType?: EventType;
}
