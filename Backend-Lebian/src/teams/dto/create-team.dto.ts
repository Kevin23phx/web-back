import { IsString, IsArray, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  category?: string[];

  @IsNumber()
  @IsOptional()
  membersCount?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

