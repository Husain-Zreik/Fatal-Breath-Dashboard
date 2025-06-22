export interface Room {
  id: number;
  name: string;
  type: string;
  house_id: number;
  houseName?: string; // For when rooms are retrieved with house name
}
