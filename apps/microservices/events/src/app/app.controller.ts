import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

import { Event } from '@bikers-community/models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() : Event{
    const Event: Event = {createdByAdminId:'', eventId:'', eventName:'', description:'', eventDate:''};
    return Event;
  }
}
