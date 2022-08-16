export interface EventData {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  editable: boolean;
  rrule?: string;
  bookingType: 'Booking' | 'Lesson';
  bookingState: 'Approved' | 'Pending';
}
