import { UserRole } from "../enums/user-role.enum";

export interface PostUser {
  email: string;
  password: string;
  role: UserRole;
}