import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { Administrator } from './entities/administrators.entity';
import { UserProfilesModule } from '../user_profiles/user_profiles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Administrator]),
    UserProfilesModule,
  ],
  controllers: [AdministratorsController],
  providers: [AdministratorsService],
})
export class AdministratorsModule {}