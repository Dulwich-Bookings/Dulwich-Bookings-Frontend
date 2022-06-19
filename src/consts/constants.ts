import { Severity } from '@components/Notifier/Notifier';
import { Roles } from '@/modules/user/types';

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

export const Role = {
  ADMIN: 'Admin' as Roles,
  STUDENT: 'Student' as Roles,
  TEACHER: 'Teacher' as Roles,
};
