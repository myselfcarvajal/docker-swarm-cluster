import { HttpException, Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersonasService {
  constructor(private prisma: PrismaService) {}

  async create(createPersonaDto: CreatePersonaDto) {
    return await this.prisma.persona.create({
      data: {
        ...createPersonaDto,
        fecha_nacimiento: new Date(createPersonaDto.fecha_nacimiento),
      },
    });
  }

  async findAll() {
    return await this.prisma.persona.findMany();
  }

  async findOne(id: number) {
    const persona = await this.prisma.persona.findUnique({
      where: { id: id },
    });

    if (!persona) throw new HttpException('Persona Not Found', 404);

    return persona;
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    await this.findOne(id);

    const updatedPersona = await this.prisma.persona.update({
      where: { id: id },
      data: {
        ...updatePersonaDto,
        fecha_nacimiento: new Date(updatePersonaDto.fecha_nacimiento),
      },
    });
    return updatedPersona;
  }

  async remove(id: number) {
    await this.findOne(id);
    const deleteUser = await this.prisma.persona.delete({
      where: { id: id },
    });

    return deleteUser;
  }
}
