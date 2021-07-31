import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferedRideSchema } from './schemas/offer-ride.schema';
import { OfferRideController } from './offer-ride.controller';
import { OfferRideService } from './offer-ride.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Ride', schema: OfferedRideSchema }])
  ],
  controllers: [OfferRideController],
  providers: [OfferRideService],
  exports: [OfferRideService]
})
export class OfferRideModule {}
