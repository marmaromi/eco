import { UserRole } from '../enums/user-role.enum';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
  role: UserRole;
}
