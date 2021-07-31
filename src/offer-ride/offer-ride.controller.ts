import { Controller } from '@nestjs/common';
import { OfferRideService } from './offer-ride.service';

@Controller('offer-ride')
export class OfferRideController {
    constructor(private readonly offerRideService: OfferRideService) {}

    
}
