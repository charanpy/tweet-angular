export interface UserModel {
  id?: string;
  email: string;
  username: string;
  bio?: string;
  photo?: string | null;
}

export type StringOrNull = string | null;
