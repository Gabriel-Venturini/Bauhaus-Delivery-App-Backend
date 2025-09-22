import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfilesModule } from './user_profiles/user_profiles.module';
import { AdministratorsModule } from './administrators/administrators.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        
        autoLoadEntities: true,
        
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    
    // Módulos dos domínios
    UserProfilesModule,
    AdministratorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}