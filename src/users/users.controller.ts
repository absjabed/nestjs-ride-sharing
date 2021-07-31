import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddUserDto } from './dto/add-user-dto';
import { AddVehicleDto } from './dto/add-vehicle-dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('addUser')
    async createUser(@Body() addUserDto: AddUserDto): Promise<any> {
        return this.usersService.addUser(addUserDto);
    }

    @Post('addUserVehicle')
    async addUserVehicle(@Body() addVehicleDto: AddVehicleDto): Promise<any> {
        return this.usersService.addUserVehicle(addVehicleDto);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
  }

}
