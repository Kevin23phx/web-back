import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber, IsIn, IsArray } from 'class-validator';
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
  @IsIn(['plastic', 'organic', 'metal', 'glass', 'other'])
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

  @ApiProperty({ example: 'Central Park, Paris' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({ example: 'medium', enum: ['none', 'low', 'medium', 'high'] })
  @IsOptional()
  @IsIn(['none', 'low', 'medium', 'high'])
  priority?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
