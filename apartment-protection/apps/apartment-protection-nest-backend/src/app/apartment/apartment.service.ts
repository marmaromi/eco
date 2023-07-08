import { Injectable } from '@nestjs/common';
import { ApartmentDto } from "./dto/apartment.dto";

@Injectable()
export class ApartmentService {

  addApartment(dto: ApartmentDto, email: string) {
    console.log(email);
    return dto;
  }
}
