import { Timezone } from '@/modules/DateTime/types';
import moment, { Moment } from 'moment-timezone';

class DateTime {
  private utc: Moment;
  private timezone: Timezone;

  public constructor(utc: string, timezone: Timezone) {
    DateTime.validateUTCString(utc);
    this.utc = moment.utc(utc);
    this.timezone = timezone;
  }

  public toLocalDate(): Moment {
    return this.utc.tz(this.timezone);
  }

  public toTimezoneDate(timezone: Timezone): Moment {
    return this.utc.tz(timezone);
  }

  public toUTCDate(): Moment {
    return this.utc;
  }

  public static validateUTCString(utc: string): void {
    const dateParsed = new Date(Date.parse(utc));
    if (dateParsed.toISOString() !== utc || dateParsed.toUTCString() !== new Date(utc).toUTCString()) {
      throw new Error('Invalid String format for UTC');
    }
  }
}

export default DateTime;
