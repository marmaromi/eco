import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { ApartmentDto } from "./dto/apartment.dto";
import { GetUser } from "../auth/decorator";
import { ApartmentService } from "./apartment.service";

@UseGuards(JwtGuard)
@Controller('apartment')
export class ApartmentController {
  constructor(private apartmentService: ApartmentService) {}


  @Post('new')
  addApartment(@Body() dto: ApartmentDto, @GetUser('email') email: string){
    return this.apartmentService.addApartment(dto, email);
  }
}
