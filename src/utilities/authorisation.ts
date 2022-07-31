import { UserData } from '@/modules/user/types';
import { role } from '@/consts/constants';

const teacher = [role.TEACHER, role.ADMIN];
const admin = [role.ADMIN];

export function isTeacher(user: UserData | null): boolean {
  if (!user) return false;
  return teacher.includes(user.role);
}

export function isAdmin(user: UserData | null): boolean {
  if (!user) return false;
  return admin.includes(user.role);
}
