import { Window } from "./window.model";
import { AirConditionerType } from "../enums/air-conditioner-type.enum";

export interface Room {
  id: number;
  roomNumber: number;
  windows: Window[];
  airConditionerExists: boolean;
  airConditionerWorking?: boolean;
  airConditionerAge?: number;
  airConditionerType?: AirConditionerType;
  dress: boolean;
  dressComment: string;
  comments: string[];
  interruptions: string[];
  roomSketch: string;
}
