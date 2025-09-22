import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserProfileDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres.' })
  name: string;

  @IsEmail({}, { message: 'O e-mail fornecido não é válido.' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio.' })
  email: string;

  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string.' })
  @Length(10, 20, { message: 'O telefone deve ter entre 10 e 20 caracteres.' })
  phone?: string;
}