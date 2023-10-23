import { Body, Get, Post, Injectable, Query, HttpException, HttpStatus } from '@nestjs/common';
import { NewBooking, Booking } from '@bikers-community/models';
import { BikeAdapter } from '@bikers-community/adapters';
import { BookingDataAccess } from './db/booking';
import { Types } from 'mongoose';

@Injectable()
export class AppService {
  @Post('/')
  async newBooking(@Body() body: NewBooking): Promise<Booking|null> {
    const bike = await BikeAdapter.getBike(body.bikeId);
    if(!bike){
      throw new HttpException('Bike Not Found', HttpStatus.BAD_REQUEST);
    }
    if(bike.status != 'AVAILABLE'){
      throw new HttpException('Bike Not Available', HttpStatus.BAD_REQUEST);
    }
    return await BookingDataAccess.newBooking(body);
  }

  @Get('/')
  async getBooking(@Query('bookingId') bookingId: string): Promise<Booking|null>{
    return await BookingDataAccess.getBookingById(new Types.ObjectId(bookingId));
  }
}
