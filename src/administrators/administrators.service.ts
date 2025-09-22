import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrator } from './entities/administrators.entity';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UserProfilesService } from '../user_profiles/user_profiles.service';

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectRepository(Administrator)
    private readonly adminRepository: Repository<Administrator>,

    private readonly userProfilesService: UserProfilesService,
  ) {}

  /**
   * 
   * @param createAdministratorDto 
   * @author Gabriel Venturini
   */
  async create(createAdministratorDto: CreateAdministratorDto) {
    try {
        const userProfile = await this.userProfilesService.create(
            createAdministratorDto.profile,
        );

        const newAdmin = this.adminRepository.create({
            role: createAdministratorDto.role,
            permissions: createAdministratorDto.permissions,
            userProfile: userProfile,
        });

        return this.adminRepository.save(newAdmin);
    } catch (error) {
        throw new InternalServerErrorException({
                  error: error.message,
                  errorStack: error.stack,
              });
    }
  }

  /**
   * 
   * @returns JSON
   * @author Gabriel Venturini
   */
  async findAll() {
    try {
        return this.adminRepository.find({
            relations: ['userProfile'],
        });
    } catch (error) {
        throw new InternalServerErrorException({
                  error: error.message,
                  errorStack: error.stack,
              });
    }
  }

  /**
   * @author Gabriel Venturini
   */
  async findOne(id: number) {
    try {
        const admin = await this.adminRepository.findOne({
            where: { id },
            relations: ['userProfile'],
        });

        if (!admin) {
            throw new NotFoundException(`Administrador com ID ${id} não encontrado.`);
        }
        return admin;
        } catch (error) {
            throw new InternalServerErrorException({
                    error: error.message,
                    errorStack: error.stack,
                });
        }
    }
}