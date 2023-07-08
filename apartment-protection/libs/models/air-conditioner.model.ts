import { AirConditionerType } from "../enums/air-conditioner-type.enum";

export interface AirConditioner {
  exists: boolean;
  working?: boolean;
  age?: number;
  type?: AirConditionerType;
}
