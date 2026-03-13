import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @ApiProperty({ example: 'Waste in the park' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Plastic bottles and packaging everywhere' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'plastic', enum: ['plastic', 'organic', 'metal', 'glass', 'other'] })
  @IsEnum(['plastic', 'organic', 'metal', 'glass', 'other'])
  category: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  otherCategoryDescription?: string;

  @ApiPropertyOptional({ example: 48.8566 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 2.3522 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ example: 'Central Park, Paris' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
