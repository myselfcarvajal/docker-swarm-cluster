import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePersonaDto {
  @IsString()
  @IsNotEmpty()
  tipo_identificacion: string;

  @IsString()
  @IsNotEmpty()
  numero_identificacion: string;

  @IsString()
  @IsNotEmpty()
  nombre1: string;

  @IsString()
  nombre2: string;

  @IsString()
  @IsNotEmpty()
  apellido1: string;

  @IsString()
  apellido2: string;

  @IsString()
  @IsNotEmpty()
  sexo: string;

  @IsNotEmpty()
  fecha_nacimiento: string;
}

// export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {}
