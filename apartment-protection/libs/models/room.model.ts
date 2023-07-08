import { Window } from "./window.model";
import { AirConditioner } from "./air-conditioner.model";

export interface Room {
  id: number;
  roomNumber: number;
  windows: Window[];
  airConditioner: AirConditioner;
  dress: boolean;
  dressComment: string;
  comments: string[];
  interruptions: string[];
  roomSketch: string;
}
