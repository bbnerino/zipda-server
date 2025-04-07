import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async addToFavorites(userId: string, listingId: string): Promise<User> {
    console.log("Finding user with ID:", userId);
    try {
      const user = await this.userModel.findById(userId).exec();
      console.log("Found user:", user);

      if (!user) {
        throw new NotFoundException("사용자를 찾을 수 없습니다.");
      }

      if (user.favorites.includes(listingId)) {
        throw new ConflictException("이미 찜한 매물입니다.");
      }

      user.favorites.push(listingId);
      return user.save();
    } catch (error) {
      console.error("Error in addToFavorites:", error);
      throw error;
    }
  }

  async removeFromFavorites(userId: string, listingId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }

    const index = user.favorites.indexOf(listingId);
    if (index === -1) {
      throw new NotFoundException(
        "찜한 매물 목록에서 해당 매물을 찾을 수 없습니다."
      );
    }

    user.favorites.splice(index, 1);
    return user.save();
  }

  async getFavorites(userId: string): Promise<string[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }
    return user.favorites;
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException("사용자를 찾을 수 없습니다.");
      }
      return user;
    } catch (error) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }
  }
}
