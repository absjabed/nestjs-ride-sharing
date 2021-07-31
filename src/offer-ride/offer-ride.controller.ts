import { Body, Controller, Post } from '@nestjs/common';
import { FindRideDto } from './dto/find-ride-dto';
import { OfferRideDto } from './dto/offer-ride-dto';
import { OfferRideService } from './offer-ride.service';

@Controller('offer-ride')
export class OfferRideController {
    constructor(private readonly offerRideService: OfferRideService) {}

    @Post('offerRide')
    async OfferNewRide(@Body() offerRideDto: OfferRideDto): Promise<any> {
        return this.offerRideService.offerRide(offerRideDto);
    }

    @Post('findRide')
    async FindRideForUser(@Body() findRideDto: FindRideDto): Promise<any> {
        return this.offerRideService.findRideForUser(findRideDto);
    }


}
