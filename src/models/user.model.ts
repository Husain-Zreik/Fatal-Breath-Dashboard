import { House } from './house.model';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: number; // 0 or 1 based on your data
  profile_image?: string | null;
  created_at: string;
  updated_at: string;
  houses?: House[]; // optional array of houses the user belongs to
}
