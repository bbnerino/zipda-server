import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ListingDocument = Listing & Document;

@Schema({ timestamps: true })
export class Listing {
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  buildingName: string;

  @Prop({ required: true })
  addressDong: string;

  @Prop({ required: true })
  addressFull: string;

  @Prop({ required: true, enum: ["전세", "월세", "매매"] })
  type: string;

  @Prop({ required: true })
  deposit: number;

  @Prop()
  monthlyRent: number;

  @Prop({ required: true })
  area: number;

  @Prop()
  floor: string;

  @Prop({ default: 0 })
  emptyUnits: number;

  @Prop({ default: 0 })
  managementFee: number;

  @Prop({ type: [String], default: [] })
  managementItems: string[];

  @Prop()
  confirmedAt: Date;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({
    type: {
      address: String,
      lat: Number,
      lng: Number,
    },
    required: true,
  })
  location: {
    address: string;
    lat: number;
    lng: number;
  };

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  registeredBy: Types.ObjectId;

  @Prop({ default: false })
  isApproved: boolean;
}

export const ListingSchema = SchemaFactory.createForClass(Listing);
