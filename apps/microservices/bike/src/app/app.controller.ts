import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

import { Bike } from '@bikers-community/models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): Bike {
    const bike: Bike = {adminId:'', bikeId:'', status:'AVAILABLE', color:'', description:'', model:''};
    return bike;
  }
}
