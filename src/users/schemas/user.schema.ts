import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: "user" })
  role: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: "Listing" }],
    default: [],
  })
  favorites: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
