import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/infra/mongodb/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async findOneByEmailWithPassword(email: string) {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  public async getUserWithFeeds(userId: string) {
    return this.userModel.findById(userId).populate('feeds').exec();
  }

  public async createUser(userData: Partial<User>) {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }
}
