import { Room } from './room.model';
import { Resident } from './resident.model';
import { Address } from './address.model';

export interface Apartment {
  id: number;
  // createdAt: Date;
  address: Address;
  split: boolean;
  rooms: Room[];
  resident: Resident;
}
