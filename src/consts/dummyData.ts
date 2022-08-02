import { EventData } from '@/components/BookingsModal/Calendar/Calendar';
import { BookingsHeaderData } from '@/components/BookingsModal/BookingsHeader/BookingsHeader';

export const dummyResourceData: BookingsHeaderData = {
  title: 'Technology 4',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis eget orci elementum faucibus.',
};

export const dummyCalendarData: EventData[] = [
  {
    title: 'Form',
    start: '2022-06-06T08:15:00',
    end: '2022-06-06T08:30:00',
    description: 'Lecture',
    backgroundColor: '#D9D9D9',
    borderColor: '#D9D9D9',
    textColor: 'black',
    editable: false,
  },
  {
    title: 'Lesson [Period 1]',
    start: '2022-06-06T08:35:00',
    end: '2022-06-06T09:30:00',
    description: 'Lecture',
    backgroundColor: '#D9D9D9',
    borderColor: '#D9D9D9',
    textColor: 'black',
    editable: false,
  },
  {
    title: 'Lesson [Period 2]',
    start: '2022-06-06T09:35:00',
    end: '2022-06-06T10:30:00',
    description: 'Lecture',
    backgroundColor: '#D9D9D9',
    borderColor: '#D9D9D9',
    textColor: 'black',
    editable: false,
  },
  {
    title: 'MIT Meeting',
    start: '2022-06-06T10:30:00',
    end: '2022-06-06T11:00:00',
    description: 'Meeting',
    editable: true,
  },
];
