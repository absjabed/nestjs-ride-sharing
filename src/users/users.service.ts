import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddUserDto } from './dto/add-user-dto';
import { AddVehicleDto } from './dto/add-vehicle-dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>, 
  ) {}

  async addUser(userObj: AddUserDto): Promise<any>{
    const newUser = new this.userModel({
        username: userObj.username,
        gender: userObj.gender,
        age: userObj.age
    });
    const user = await this.findUserbyId(userObj.username);
    if (user) {
      return { id: null, msg:'User already registered'};
    }else{
      const result = await newUser.save();
      return { id: result.id as string, msg:'User registered successfully!' };
    }
  }

  async addUserVehicle(userVehicleObj: AddVehicleDto): Promise<any>{
    const user = await this.findUserbyId(userVehicleObj.username);
        if(!user) return { msg: 'User not found' };
    const alreadyHave = await this.userAlreadyHasTheVehicle(userVehicleObj.username, userVehicleObj.vehicle_brand+","+userVehicleObj.vehicle_number);
        if(alreadyHave) return { msg: 'User already have this vehicle, try adding another one.' };

    user.vehicles.push({
      vehicle_brand: userVehicleObj.vehicle_brand,
      vehicle_number: userVehicleObj.vehicle_number,
      vehicleId: userVehicleObj.vehicle_brand+","+userVehicleObj.vehicle_number
    });

    let resp = await user.save();
    if (!resp) {
      return { id: null, msg:'Something Went wrong while adding new vehicle.'};
    }else{
      return { id: resp.id as string, msg: 'New vehicle added successfully!' };
    }
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(usr => <User>({
      username: usr.username,
      gender: usr.gender,
      age: usr.age,
      vehicles: usr.vehicles
    }));
  }

  private async userAlreadyHasTheVehicle(usrname: string, vehicleId: string){
    let hasTheVehicle = await this.userModel.findOne({ username: usrname, vehicles: { $elemMatch: { vehicleId: vehicleId } } }).exec();
    if(hasTheVehicle){
      return true;
    }else{
      return false;
    }
  }

  async findUserbyId(usrname: string): Promise<User> {
    let user = await this.userModel.findOne({ username: usrname }).exec();
    return user;
  }
}
