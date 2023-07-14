import { Injectable } from '@nestjs/common';
import { ApartmentDto } from './dto/apartment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApartmentService {
  constructor(private prisma: PrismaService) {}

  getAllApartments() {
    return this.prisma.apartment.findMany({
      include: {
        resident: {
          include: {
            interactions: true,
          }
        },
        rooms: {
          include: {
            windows: true,
          }
        }
      }
    });
  }

  getApartmentById(id: string) {
    return this.prisma.apartment.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        resident: {
          include: {
            interactions: true,
          }
        },
        rooms: {
          include: {
            windows: true,
          }
        }
      }
    });
  }

  addApartment(dto: ApartmentDto) {
    return this.prisma.apartment.create({
      data: {
        city: dto.address.city,
        street: dto.address.street,
        streetNumber: dto.address.streetNumber,
        floorNumber: dto.address.floorNumber,
        apartmentNumber: dto.address.apartmentNumber,
        split: dto.split,
        resident: {
          create: {
            firstName: dto.resident.firstName,
            lastName: dto.resident.lastName,
            mobilePhoneNumber: dto.resident.mobilePhoneNumber,
            homePhoneNumber: dto.resident.homePhoneNumber,
            comments: dto.resident.comments,
            interactions: {
              create: dto.resident.interactions.map((interaction) => ({
                interactionType: interaction.interactionType,
                date: interaction.date,
                content: interaction.content,
              })),
            },
          },
        },
        rooms: {
          create: dto.rooms.map((room) => ({
            roomNumber: room.roomNumber,
            airConditionerExists: room.airConditionerExists,
            airConditionerWorking: room.airConditionerWorking,
            airConditionerAge: room.airConditionerAge,
            airConditionerType: room.airConditionerType,
            dressExists: room.dressExists,
            dressComment: room.dressComment,
            comments: room.comments,
            interruptions: room.interruptions,
            windows: {
              create: room.windows.map((window) => ({
                windowNumber: window.windowNumber,
                windowType: window.windowType,
                wingsAmount: window.wingsAmount,
                width: window.width,
                height: window.height,
                thickness: window.thickness,
                uk: window.uk,
                color: window.color,
                glaze: window.glaze,
                material: window.material,
                bars: window.bars,
                barsType: window.barsType,
                net: window.net,
                shutter: window.shutter,
              })),
            },
          })),
        },
      },
      include: {
        resident: {
          include: {
            interactions: true,
          }
        },
        rooms: {
          include: {
            windows: true,
          }
        }
      }
    });
  }

}
