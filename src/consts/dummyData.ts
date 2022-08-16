import { EventData } from '@/modules/Bookings/Types';
import { BookingsHeaderData } from '@/components/BookingsModal/BookingsHeader/BookingsHeader';

export const dummyResourceData: BookingsHeaderData = {
  title: 'Technology 4',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis eget orci elementum faucibus.',
};

export const dummyCalendarData: EventData[] = [
  {
    id: Math.random().toString(),
    title: 'Form',
    start: '2022-06-06T08:15:00',
    end: '2022-06-06T08:30:00',
    description: 'Lecture',
    bookingState: 'Approved',
    bookingType: 'Booking',
    backgroundColor: '#E33939',
    // id: 0,
    textColor: '#fff',
    editable: true,
  },

  {
    id: Math.random().toString(),
    title: 'MIT Meeting',
    start: '2022-06-06T10:30:00',
    end: '2022-06-06T11:00:00',
    description: 'Meeting',
    bookingState: 'Approved',
    bookingType: 'Booking',
    backgroundColor: '#E6AEAE',
    // id: 1,
    textColor: '#fff',
    editable: false,
  },

  {
    id: Math.random().toString(),
    title: 'House Meeting',
    start: '2022-06-06T09:35:00',
    end: '2022-06-06T10:30:00',
    description: 'Meeting',
    bookingState: 'Approved',
    bookingType: 'Booking',
    backgroundColor: '#2E2E2E',
    // id: 2,
    textColor: '#fff',
    editable: false,
  },
  {
    id: Math.random().toString(),
    title: 'deepracer meeting',
    start: '2022-06-06T012:45:00',
    end: '2022-06-06T13:30:00',
    description: 'Velocity meeting',
    bookingState: 'Pending',
    bookingType: 'Booking',
    backgroundColor: '#2E2E2E', // Add Transparency
    // id: 3,
    textColor: '#fff',
    editable: true,
  },
  {
    id: Math.random().toString(),
    title: 'Maths',
    start: '2022-06-06T02:35:00',
    end: '2022-06-06T3:30:00',
    description: 'HL maths lesson',
    bookingState: 'Approved',
    bookingType: 'Lesson',
    backgroundColor: '#E6E6E6',
    // id: 4,
    textColor: '#000',
    editable: false,
  },
];
