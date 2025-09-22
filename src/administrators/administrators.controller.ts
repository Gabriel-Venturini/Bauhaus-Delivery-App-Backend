import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';

@Controller('administrators')
export class AdministratorsController {
    private readonly logger = new Logger(AdministratorsController.name);

    constructor(private readonly administratorsService: AdministratorsService) {}

    @Post()
    create(@Body() createAdministratorDto: CreateAdministratorDto) {
        this.logger.debug(`[POST] createAdministrator`);
        return this.administratorsService.create(createAdministratorDto);
    }

    @Get()
    findAll() {
        this.logger.debug(`[GET] findAllAdministrators`)
        return this.administratorsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        this.logger.debug(`[GET] findAdministratorById for id ${id}`)
        return this.administratorsService.findOne(id);
    }

    // Falta endpoints para @Patch(':id') e @Delete(':id')
}