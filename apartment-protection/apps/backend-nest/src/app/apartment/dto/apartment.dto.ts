import { Apartment } from '../../../../../../libs/models/apartment.model';
import { Room } from '../../../../../../libs/models/room.model';
import { Resident } from '../../../../../../libs/models/resident.model';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WindowType } from '../../../../../../libs/enums/window-type.enum';
import { WindowColor } from '../../../../../../libs/enums/window-color.enum';
import { WindowGlaze } from '../../../../../../libs/enums/window-glaze.enum';
import { WindowMaterial } from '../../../../../../libs/enums/window-material.enum';
import { WindowNet } from '../../../../../../libs/enums/window-net.enum';
import { WindowShutter } from '../../../../../../libs/enums/window-shutter.enum';
import { Window } from '../../../../../../libs/models/window.model';
import { AirConditionerType } from '../../../../../../libs/enums/air-conditioner-type.enum';
import { Address } from '../../../../../../libs/models/address.model';
import { ResidentInteraction } from '../../../../../../libs/models/resident-interaction.model';
import { ResidentInteractionType } from '../../../../../../libs/enums/resident-interaction-type.enum';

export class ApartmentDto implements Omit<Apartment, 'id'> {
  @IsDate()
  createdAt: Date;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address: Address;

  @IsNotEmpty()
  split: boolean;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomDto)
  rooms: Room[];

  @IsNotEmpty()
  @Type(() => ResidentDto)
  resident: Resident;
}

class AddressDto implements Address {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  streetNumber: string;

  @IsNumber()
  floorNumber?: number;

  @IsNumber()
  apartmentNumber?: number;
}

class RoomDto implements Omit<Room, 'id'> {
  @IsNotEmpty()
  @IsNumber()
  roomNumber: number;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WindowDto)
  windows: WindowDto[];

  @IsNotEmpty()
  @IsBoolean()
  airConditionerExists: boolean;

  @ValidateIf((o) => o.exists)
  @IsNotEmpty()
  @IsBoolean()
  airConditionerExistsWorking?: boolean;

  @ValidateIf((o) => o.exists)
  @IsNotEmpty()
  @IsNumber()
  airConditionerExistsAge?: number;

  @ValidateIf((o) => o.exists)
  @IsNotEmpty()
  @IsEnum(AirConditionerType)
  airConditionerExistsType?: AirConditionerType;

  @IsNotEmpty()
  @IsBoolean()
  dress: boolean;

  @ValidateIf((o) => o.dress)
  @IsString()
  dressComment: string;

  @IsArray()
  comments: string[];

  @IsArray()
  interruptions: string[];

  @IsString()
  roomSketch: string;
}

class WindowDto implements Omit<Window, 'id'> {
  @IsNotEmpty()
  @IsNumber()
  windowNumber: number;

  @IsNotEmpty()
  @IsEnum(WindowType)
  windowType: WindowType;

  @IsNotEmpty()
  @IsNumber()
  wingsAmount: number;

  @IsNotEmpty()
  @IsNumber()
  width: number;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  thickness: number;

  @IsNotEmpty()
  @IsNumber()
  uk: number;

  @IsNotEmpty()
  @IsEnum(WindowColor)
  color: WindowColor;

  @IsNotEmpty()
  @IsEnum(WindowGlaze)
  glaze: WindowGlaze;

  @IsNotEmpty()
  @IsEnum(WindowMaterial)
  material: WindowMaterial;

  @IsNotEmpty()
  @IsBoolean()
  bars: boolean;

  @ValidateIf((o) => o.bars)
  @IsNotEmpty()
  @IsString()
  barsType: string;

  @IsNotEmpty()
  @IsEnum(WindowNet)
  net: WindowNet;

  @IsNotEmpty()
  @IsEnum(WindowShutter)
  shutter: WindowShutter;
}

class ResidentDto implements Omit<Resident, 'id'> {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  mobilePhoneNumber: string;

  @IsString()
  homePhoneNumber?: string;

  comments?: string[];

  @IsArray()
  @Type(() => ResidentInteractionDto)
  interactions: ResidentInteraction[];
}

class ResidentInteractionDto implements Omit<ResidentInteraction, 'id'> {
  @IsNotEmpty()
  @IsString()
  interactionType: ResidentInteractionType;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  content: string;
}
