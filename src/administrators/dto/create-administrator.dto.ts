import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserProfileDto } from '../../user_profiles/dto/create-user_profile.dto';
import { AdminRole } from '../entities/administrators.entity';

export class CreateAdministratorDto {
  @IsNotEmpty({ message: 'Os dados do perfil são obrigatórios.' })
  @ValidateNested()
  @Type(() => CreateUserProfileDto)
  profile: CreateUserProfileDto;

  @IsNotEmpty({ message: 'O cargo (role) é obrigatório.' })
  @IsEnum(AdminRole, { message: 'O cargo fornecido não é válido.' })
  role: AdminRole;

  @IsOptional()
  @IsObject({ message: 'As permissões devem ser um objeto JSON.' })
  permissions?: object;
}