export interface UserBase {
  id: string;
  email: string;
}

export interface User extends UserBase {
  passwordHash: string;
}
