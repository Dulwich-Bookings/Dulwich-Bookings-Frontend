type Roles = 'Student' | 'Teacher' | 'Admin';

export interface UserSignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
  schoolId: number;
}

export interface UserData {
  id: number;
  email: string;
  role: Roles;
  isTemporary: boolean;
  isConfirmed: boolean;
  schoolId: number;
}

export type UserPutData = Partial<UserData>;
