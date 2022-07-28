import { role } from '@/consts/constants';
import { UserData } from '@/modules/user/types';

export function isTeacher(user: UserData | null): boolean {
  if (user === null) {
    return false;
  }
  return user.role !== role.STUDENT;
}
