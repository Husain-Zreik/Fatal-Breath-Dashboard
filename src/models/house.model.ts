import { Room } from './room.model';

export interface House {
  id: number;
  name: string;
  city: string;
  country: string;
  rooms?: Room[]; // Optional if you expect rooms to be nested
}
