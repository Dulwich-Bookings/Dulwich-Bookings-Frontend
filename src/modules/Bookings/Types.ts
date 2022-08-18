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

export interface EventData {
  id: string;
  userId: number;
  title: string;
  start: string;
  end: string;
  description: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  editable: boolean;
  rrule?: string;
  bookingType: BookingTypes;
  bookingState: BookingStates;
}
