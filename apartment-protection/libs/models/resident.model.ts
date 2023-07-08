import { ResidentInteraction } from "./resident-interaction.model";

export interface Resident {
  id: number;
  firstName: string;
  lastName: string;
  mobilePhoneNumber: string;
  homePhoneNumber?: string;
  comments?: string[];
  interactions: ResidentInteraction[];
}
