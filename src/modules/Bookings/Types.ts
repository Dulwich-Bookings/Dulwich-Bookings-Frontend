export type BookingType = 'Booking' | 'Lesson';

export type BookingState = 'Approved' | 'Pending';

export type Recurring = 'Weekly' | 'BiWeekly' | 'None';

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
  bookingType: BookingType;
  bookingState: BookingState;
}
