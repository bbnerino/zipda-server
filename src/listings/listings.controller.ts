import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ListingsService } from "./listings.service";
import { CreateListingDto } from "./dto/create-listing.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("listings")
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createListingDto: CreateListingDto, @Req() req) {
    return this.listingsService.create(createListingDto, req.user.userId);
  }

  @Get()
  async findAll(@Query() query) {
    return this.listingsService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.listingsService.findOne(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: string,
    @Body() updateListingDto: Partial<CreateListingDto>
  ) {
    return this.listingsService.update(id, updateListingDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async remove(@Param("id") id: string) {
    await this.listingsService.remove(id);
    return { message: "매물이 삭제되었습니다." };
  }
}
