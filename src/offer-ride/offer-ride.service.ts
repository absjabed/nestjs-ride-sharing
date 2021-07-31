import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { FindRideDto } from './dto/find-ride-dto';
import { OfferRideDto } from './dto/offer-ride-dto';
import { OfferedRide } from './schemas/offer-ride.schema';

@Injectable()
export class OfferRideService {
  constructor(
    private readonly userService: UsersService,
    @InjectModel('Ride') private readonly offeredRideModel: Model<OfferedRide>, 
  ) {}

  async offerRide(offerRideDto: OfferRideDto): Promise<any>{
    const user = await this.userService.findUserbyId(offerRideDto.username);
        if(!user) return { msg: 'User not found' };
    const rideInfo = await this.findRideInfo(offerRideDto.username, offerRideDto.vehicle);
        if(rideInfo) return { msg: 'A ride has already been offered by this user for this vehicle.' };
    
          const newRide = new this.offeredRideModel({
            username: offerRideDto.username,
            origin: offerRideDto.origin,
            available_seats: offerRideDto.available_seats,
            vehicle: offerRideDto.vehicle,
            destination: offerRideDto.destination
        });
    
        const result = await newRide.save();
        return { id: result.id as string, msg:'Ride Offered successfully!' };
  }

  async findRideForUser(findRideDto: FindRideDto): Promise<any>{
    const user = await this.userService.findUserbyId(findRideDto.username);
        if(!user) return { msg: 'User not found' };
    
    const rideForUSer = await this.findRideForAUser(findRideDto);
      
    if (!rideForUSer) {
      return { id: null, msg:'No ride found for the user'};
    }else{
      return { msg: 'Found a Ride for you!', rideInfo: rideForUSer };
    }
  }

  private async findRideForAUser(findRideDto: FindRideDto){
    let foundRide: any;
    if(findRideDto.preferred_vehicle === "Most Vacant"){
      foundRide = await this.offeredRideModel.findOne({ origin: findRideDto.origin, destination: findRideDto.destination, available_seats: { $gte: findRideDto.seats } }).exec();
    }else{
      foundRide = await this.offeredRideModel.findOne({ origin: findRideDto.origin, destination: findRideDto.destination, available_seats: { $gte: findRideDto.seats }, vehicle: { "$in": findRideDto.preferred_vehicle as any} }).exec();
    }
    return foundRide;
  }

  private async findRideInfo(usrname: string, vehicleId: string): Promise<OfferedRide> {
    let ride = await this.offeredRideModel.findOne({ username: usrname, vehicle: vehicleId }).exec();
    return ride;
  }
}
