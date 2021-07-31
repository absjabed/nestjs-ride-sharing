import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    created: { type: Date, default: Date.now },
    vehicles: { type : Array , "default" : [] },
    isactive: { type: Boolean, default: true }
});

export interface User extends mongoose.Document {
  username: string;
  gender: string;
  age: number;
  created: Date;
  vehicles: Array<any>;
  isactive: boolean;
}
