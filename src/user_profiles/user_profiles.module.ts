import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user_profiles.entity';
import { UserProfilesService } from './user_profiles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile]),
  ],
  providers: [
    UserProfilesService,
  ],
  exports: [
    UserProfilesService,
  ],
})
export class UserProfilesModule {}