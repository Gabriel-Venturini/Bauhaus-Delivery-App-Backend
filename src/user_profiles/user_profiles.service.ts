import { Injectable, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user_profiles.entity';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  /**
   * Cria um novo perfil de usuário.
   * Lança uma exceção se o e-mail já existir.
   * 
   * @author Gabriel Venturini
   */
  async create(createUserProfileDto: CreateUserProfileDto) {
    try {
      const existingProfile = await this.userProfileRepository.findOne({
        where: { email: createUserProfileDto.email },
      });

      if (existingProfile) {
        throw new ConflictException(`Não foi possível concluir a operação. O e-mail ${createUserProfileDto.email} já está em uso.`);
      }
      
      const newProfile = this.userProfileRepository.create(createUserProfileDto);
      return this.userProfileRepository.save(newProfile); 
    } catch (error) {
        throw new InternalServerErrorException({
                  error: error.message,
                  errorStack: error.stack,
              });
    }
  }

  /**
   * Encontra um perfil de usuário pelo seu ID.
   * Lança uma exceção se o perfil não for encontrado.
   * 
   * @author Gabriel Venturini
   */
  async findOne(id: number) {
    try {
      const profile = await this.userProfileRepository.findOne({ where: { id } });
      if (!profile) {
        throw new NotFoundException(`Perfil com ID ${id} não encontrado.`);
      }
      return profile;
    } catch (error) {
        throw new InternalServerErrorException({
                  error: error.message,
                  errorStack: error.stack,
              });
    }
  }
} 