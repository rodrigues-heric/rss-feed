import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/infra/mongodb/schemas/users.schema';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async findOneByEmailWithPassword(email: string) {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  public async getUserWithFeeds(userId: string) {
    return this.userModel.findById(userId).populate('feeds').exec();
  }

  public async getUserSubscriptions(userId: string) {
    const user = await this.getUserWithFeeds(userId);
    if (!user) throw new NotFoundException('User not found');

    const feeds = (user.feeds as any[]).map((f) => ({
      _id: f._id,
      url: f.url,
    }));

    return { feeds };
  }

  public async createUser(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) throw new ConflictException('Email already in use');

    const user = new this.userModel({ email, password });
    await user.save();

    const userObj: any = user.toObject();
    delete userObj.password;
    return userObj;
  }
}
