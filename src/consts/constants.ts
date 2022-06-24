import { Severity } from '@components/Notifier/Notifier';
import { Role } from '@/modules/user/types';

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

export const role = {
  ADMIN: 'Admin' as Role,
  TEACHER: 'Teacher' as Role,
  STUDENT: 'Student' as Role,
};
