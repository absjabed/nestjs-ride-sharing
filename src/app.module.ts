import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tmpride:vQGdrVKUPLKoPQOX@cluster0.kxec3.mongodb.net/ride-sharinng-app?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
