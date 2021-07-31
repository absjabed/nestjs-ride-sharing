import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ReportController } from './report/report.controller';
import { OfferRideController } from './offer-ride/offer-ride.controller';
import { UsersModule } from './users/users.module';
import { OfferRideModule } from './offer-ride/offer-ride.module';

@Module({
  imports: [
    UsersModule,
    OfferRideModule,
    MongooseModule.forRoot(
      'mongodb+srv://tmpride:vQGdrVKUPLKoPQOX@cluster0.kxec3.mongodb.net/ride-sharinng-app?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController, UsersController, ReportController, OfferRideController],
  providers: [AppService],
})
export class AppModule {}
