import * as mongoose from 'mongoose';

export const OfferedRideSchema = new mongoose.Schema({
    username: { type: String, required: true },
    origin: { type: String, required: true },
    available_seats: { type: Number, required: true },
    vehicle: { type: String, required: true },
    destination: { type: String, required: true },    
    created: { type: Date, default: Date.now },
    takenBy: { type : Array , "default" : [] },
    isEnded: { type: Boolean, default: false }
});

export interface OfferedRide extends mongoose.Document {
  username: string;
  origin: string;
  available_seats: number;
  vehicle: string;
  destination: string;
  created?: Date;
  takenBy?: Array<string>;
  isEnded?: boolean;
}
