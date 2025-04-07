import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Listing, ListingDocument } from "./schemas/listing.schema";
import { CreateListingDto } from "./dto/create-listing.dto";

@Injectable()
export class ListingsService {
  constructor(
    @InjectModel(Listing.name) private listingModel: Model<ListingDocument>
  ) {}

  async create(
    createListingDto: CreateListingDto,
    userId: string
  ): Promise<ListingDocument> {
    const createdListing = new this.listingModel({
      ...createListingDto,
      registeredBy: new Types.ObjectId(userId),
    });
    return createdListing.save();
  }

  async findAll(query: any = {}): Promise<ListingDocument[]> {
    const { type, location, minPrice, maxPrice, ...rest } = query;

    const filter: any = { ...rest };

    if (type) {
      filter.type = type;
    }

    if (location) {
      filter.addressDong = { $regex: location, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.deposit = {};
      if (minPrice) filter.deposit.$gte = Number(minPrice);
      if (maxPrice) filter.deposit.$lte = Number(maxPrice);
    }

    return this.listingModel
      .find(filter)
      .populate("registeredBy", "name")
      .exec();
  }

  async findOne(id: string): Promise<ListingDocument> {
    const listing = await this.listingModel
      .findById(id)
      .populate("registeredBy", "name")
      .exec();

    if (!listing) {
      throw new NotFoundException("매물을 찾을 수 없습니다.");
    }

    return listing;
  }

  async update(
    id: string,
    updateData: Partial<CreateListingDto>
  ): Promise<ListingDocument> {
    const listing = await this.listingModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .exec();

    if (!listing) {
      throw new NotFoundException("매물을 찾을 수 없습니다.");
    }

    return listing;
  }

  async remove(id: string): Promise<void> {
    const result = await this.listingModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException("매물을 찾을 수 없습니다.");
    }
  }
}
