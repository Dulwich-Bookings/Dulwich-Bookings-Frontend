export type Role = 'Student' | 'Teacher' | 'Admin';

export interface UserSignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
  schoolId: number;
  class?: number;
}

export interface UserData {
  id: number;
  email: string;
  role: Role;
  isTemporary: boolean;
  isConfirmed: boolean;
  schoolId: number;
  class: number;
}

export type UserPutData = Partial<UserData>;
