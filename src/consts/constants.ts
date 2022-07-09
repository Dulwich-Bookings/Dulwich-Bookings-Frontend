import { Severity } from '@components/Notifier/Notifier';
import { Timezone } from '@/modules/DateTime/types';
import { Role } from '@/modules/user/types';

import LandingImage1 from '@/assets/images/Landing-Sample-1.png';
import LandingImage2 from '@/assets/images/Landing-Sample-2.png';
import LandingImage3 from '@/assets/images/Landing-Sample-3.png';

export const locationImages = [
  {
    id: 1,
    img: LandingImage3,
  },
  {
    id: 2,
    img: LandingImage1,
  },
  {
    id: 3,
    img: LandingImage2,
  },
];

export type LandingRoute = {
  route: string;
  routeText: string;
};

export const severity = {
  SUCCESS: 'success' as Severity,
  LOADING: 'loading' as Severity,
  ERROR: 'error' as Severity,
  WARNING: 'warning' as Severity,
  INFO: 'info' as Severity,
};

export const timezone = {
  SHANGHAI: 'Asia/Shanghai' as Timezone,
  SEOUL: 'Asia/Seoul' as Timezone,
  SINGAPORE: 'Asia/Singapore' as Timezone,
  LONDON: 'Europe/London' as Timezone,
};

export const role = {
  ADMIN: 'Admin' as Role,
  STUDENT: 'Student' as Role,
  TEACHER: 'Teacher' as Role,
};
