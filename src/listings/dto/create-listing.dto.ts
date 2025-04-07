import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsEnum,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class LocationDto {
  @IsString()
  address: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export class CreateListingDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  buildingName?: string;

  @IsString()
  addressDong: string;

  @IsString()
  addressFull: string;

  @IsEnum(["전세", "월세", "매매"])
  type: string;

  @IsNumber()
  deposit: number;

  @IsNumber()
  @IsOptional()
  monthlyRent?: number;

  @IsNumber()
  area: number;

  @IsString()
  @IsOptional()
  floor?: string;

  @IsNumber()
  @IsOptional()
  emptyUnits?: number;

  @IsNumber()
  @IsOptional()
  managementFee?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  managementItems?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
