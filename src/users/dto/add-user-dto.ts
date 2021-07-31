export class AddUserDto {
    username: string;
    gender: string;
    age: string;
    vehicles?: vehicle[];
}

class vehicle {
    vehicleId?: string;
    vehicle_number: string;
    vehicle_brand: string;
}