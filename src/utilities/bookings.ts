import { BookingData, BookingState, BookingStates, BookingType, BookingTypes, EventData, EventType } from '@/modules/Bookings/Types';
import { ResourceData } from '@/modules/resource/types';
import { UserData } from '@/modules/user/types';
import { ResourceMapData } from '@/modules/resourceMap/types';
import { isAdmin, isTeacher } from '@/utilities/authorisation';

import TailWindTheme from '@/tailwind.config';
import { createDuration, EventDropArg } from '@fullcalendar/react';
import { EventResizeDoneArg } from '@fullcalendar/interaction';
import moment from 'moment';

const { colors } = TailWindTheme.theme.extend;

export const getBookingState = (user: UserData, resource: ResourceData) => {
  if (isAdmin(user)) {
    return BookingState.APPROVED;
  }
  if (isTeacher(user) && resource.bookingRights.includes('Teacher')) {
    return BookingState.APPROVED;
  }
  if (resource.bookingRights.includes('Student')) {
    return BookingState.APPROVED;
  }

  return BookingState.PENDING;
};

export const getBgColor = (
  bookingType: BookingTypes,
  bookingState: BookingStates,
  resourceMaps: ResourceMapData[],
  currentResource: ResourceData,
  currentUser: UserData,
) => {
  const allResourceOwners = resourceMaps.filter(r => r.resourceId === currentResource.id);
  const isResourceOwner = allResourceOwners.find(r => r.userId === currentUser.id);

  if (bookingType === BookingType.LESSON) {
    return colors.bgLesson;
  }

  // Pending Color
  if (bookingState === BookingState.PENDING && isResourceOwner) {
    return colors.bgLightRed;
  }
  if (bookingState === BookingState.PENDING && !isResourceOwner) {
    return colors.bgBookingBlackPending;
  }

  // Normal Booking Color
  if (isResourceOwner) {
    return colors.dulwichRed;
  } else {
    return colors.bgBlack;
  }
};

export const getTextColor = (bookingType: BookingTypes) => {
  if (bookingType === BookingType.LESSON) {
    return colors.bgBlack;
  }

  return colors.white;
};

export const getIsEditable = (resourceMaps: ResourceMapData[], currentResource: ResourceData, currentUser: UserData) => {
  const allResourceOwners = resourceMaps.filter(r => r.resourceId === currentResource.id);
  const isResourceOwner = allResourceOwners.find(r => r.userId === currentUser.id);

  if (!isResourceOwner && !isAdmin(currentUser)) {
    return false;
  }

  return true;
};

export const getEventType = (event: EventData) => {
  if (event.rrule) {
    return EventType.RECURRING;
  }
  return EventType.SINGLE;
};

export const eventDateDuration = (start: Date, end: Date): Duration => {
  const duration = createDuration(end.getTime() - start.getTime());
  if (duration === null) {
    const emptyDuration: Duration = {
      years: 0,
      months: 0,
      days: 0,
      minutes: 0,
    };
    return emptyDuration;
  }

  return duration;
};

export const getEventData = (e: EventDropArg | EventResizeDoneArg) => {
  return {
    id: e.event.id,
    userId: e.event.extendedProps.userId,
    title: e.event.title,
    formLabel: e.event.extendedProps.formLabel,
    start: moment(e.event.start).toDate(),
    end: moment(e.event.end).toDate(),
    description: e.event.extendedProps.description,
    rrule: e.event._def.recurringDef?.typeData.rruleSet._rrule[0] ?? undefined,
    editable: e.event.startEditable,
    bookingType: e.event.extendedProps.bookingType,
    bookingState: e.event.extendedProps.bookingState,
    eventType: e.event.extendedProps.eventType,
  };
};

export const mapBookingDataToEventData = (
  booking: BookingData[],
  currUser: UserData,
  resourceMap: ResourceMapData[],
  resource: ResourceData,
): EventData[] => {
  return booking.map(b => {
    return {
      id: b.id.toString(),
      userId: b.userId,
      title: b.bookingType === BookingType.LESSON ? 'Lesson' : 'Booked',
      formLabel: b.bookingType === BookingType.LESSON ? 'Lesson' : 'Booked',
      start: new Date(b.startDateTime),
      end: new Date(b.endDateTime),
      duration: eventDateDuration(new Date(b.startDateTime), new Date(b.endDateTime)),
      description: b.description,
      backgroundColor: getBgColor(b.bookingType, b.bookingState, resourceMap, resource, currUser),
      borderColor: getBgColor(b.bookingType, b.bookingState, resourceMap, resource, currUser),
      textColor: getTextColor(b.bookingType),
      editable: getIsEditable(resourceMap, resource, currUser),
      rrule: b.RRULE,
      bookingType: b.bookingType,
      bookingState: b.bookingState,
      eventType: b.RRULE ? EventType.RECURRING : EventType.SINGLE,
    };
  });
};
