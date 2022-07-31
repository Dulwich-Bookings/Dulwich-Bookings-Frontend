import { Severity } from '@components/Notifier/Notifier';
import { Timezone } from '@/modules/DateTime/types';
import { Role } from '@/modules/user/types';

import DCB from '@/assets/images/Dulwich-College-Beijing.jpg';
import LandingSample1 from '@/assets/images/Landing-Sample-1.png';

export type SearchState = 'all' | 'resources' | 'subscriptions';

export const searchStateMap = {
  ALL: 'all' as SearchState,
  RESOURCES: 'resource' as SearchState,
  SUBSCRIPTIONS: 'subscription' as SearchState,
};

export const resourceTypes = {
  RESOURCE: 'resource' as SearchState,
  SUBSCRIPTION: 'subscription' as SearchState,
};

export const locationImages = [
  {
    id: 1,
    img: DCB,
  },
  {
    id: 2,
    img: LandingSample1,
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
