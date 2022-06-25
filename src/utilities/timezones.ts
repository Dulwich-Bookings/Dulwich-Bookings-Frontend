import moment, { Moment } from 'moment';

export function convertToUTC(time: Moment) {
  return moment.utc(time);
}

export function convertToLocal(time: Moment, timezone: string) {
  const moment = require('moment-timezone');
  return moment(time).tz(timezone);
}
