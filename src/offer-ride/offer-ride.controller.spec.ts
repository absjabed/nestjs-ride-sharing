import { Test, TestingModule } from '@nestjs/testing';
import { OfferRideController } from './offer-ride.controller';

describe('OfferRideController', () => {
  let controller: OfferRideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferRideController],
    }).compile();

    controller = module.get<OfferRideController>(OfferRideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
