import { ResidentInteractionType } from "../enums/resident-interaction-type.enum";

export interface ResidentInteraction {
  id: number;
  interactionType: ResidentInteractionType;
  date: Date;
  content: string;
}
