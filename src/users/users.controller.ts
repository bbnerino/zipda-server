import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { User } from "./schemas/user.schema";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get("me/favorites")
  @UseGuards(JwtAuthGuard)
  async getFavorites(@Request() req) {
    return this.usersService.getFavorites(req.user.userId);
  }

  @Post("me/favorites/:listingId")
  @UseGuards(JwtAuthGuard)
  async addToFavorites(@Request() req, @Param("listingId") listingId: string) {
    return this.usersService.addToFavorites(req.user.userId, listingId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("me/favorites/:listingId")
  async removeFromFavorites(
    @Request() req,
    @Param("listingId") listingId: string
  ) {
    return this.usersService.removeFromFavorites(req.user.userId, listingId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
