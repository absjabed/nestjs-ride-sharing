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

  async endRide(offerRideDto: OfferRideDto): Promise<any>{
    
    const user = await this.userService.findUserbyId(offerRideDto.username);
        if(!user) return { msg: 'User not found' };

    let rideInfo = await this.findRide(offerRideDto.vehicle, offerRideDto.origin, offerRideDto.destination);
        if(!rideInfo) return { msg: 'No ride found to be ended.' };
        if(rideInfo.isEnded) return { msg: 'This Ride has already been ended.' };

        rideInfo.isEnded = true;
    
        const result = await rideInfo.save();
        return { id: result.id as string, msg:'Ride Ended successfully!' };
  }

  async findRideForUser(findRideDto: FindRideDto): Promise<any>{
    const user = await this.userService.findUserbyId(findRideDto.username);
        if(!user) return { msg: 'User not found' };
    
    const rideForUser = await this.findRideForAUser(findRideDto);
    if (!rideForUser) {
      return { id: null, msg:'No ride found for the user'};
    }else{
        if(rideForUser.takenBy.findIndex(a => a === findRideDto.username) >= 0) return { msg: 'User already took one ride & it\'s not ended yet' };
        rideForUser.takenBy.push(user.username);
        const result = await rideForUser.save();
      return { msg: 'Found a Ride for you!', rideInfo: rideForUser, id: result.id as string };
    }
  }

  private async findRideForAUser(findRideDto: FindRideDto){
    let foundRide: any;
    if(findRideDto.preferred_vehicle === "Most Vacant"){
      foundRide = await this.offeredRideModel.findOne({ isEnded: false, origin: findRideDto.origin, destination: findRideDto.destination, available_seats: { $gte: findRideDto.seats } }).sort('-available_seats').exec();
    }else{
      foundRide = await this.offeredRideModel.findOne({ isEnded: false, origin: findRideDto.origin, destination: findRideDto.destination, available_seats: { $gte: findRideDto.seats }, vehicle: { $regex: findRideDto.preferred_vehicle, $options: 'i' } }).exec();
    }
    return foundRide;
  }

  private async findRideInfo(usrname: string, vehicleId: string): Promise<OfferedRide> {
    let ride = await this.offeredRideModel.findOne({ username: usrname, vehicle: vehicleId, isEnded: false }).exec();
    return ride;
  }

  private async findRide(vehicleId: string, origin: string, destination: string): Promise<OfferedRide> {
    let ride = await this.offeredRideModel.findOne({ vehicle: vehicleId, origin: origin, destination: destination }).exec();
    return ride;
  }
}
