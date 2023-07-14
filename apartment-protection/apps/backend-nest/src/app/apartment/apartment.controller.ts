import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from '../auth/guard';
import { ApartmentDto } from './dto/apartment.dto';
import { ApartmentService } from './apartment.service';

@UseGuards(JwtGuard)
@Controller('apartments')
export class ApartmentController {
  constructor(private apartmentService: ApartmentService) {}

  @Get('')
  getAllApartments() {
    return this.apartmentService.getAllApartments();
  }

  @Get(':id')
  getApartmentById(@Param('id') id: string) {
    return this.apartmentService.getApartmentById(id);
  }

  @Post('')
  addApartment(@Body() dto: ApartmentDto) {
    return this.apartmentService.addApartment(dto);
  }
}
