import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from 'src/infra/mongodb/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
