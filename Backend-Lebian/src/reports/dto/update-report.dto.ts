import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReportDto {
  @ApiPropertyOptional({ enum: ['pending', 'assigned', 'in_progress', 'completed', 'rejected'] })
  @IsOptional()
  @IsEnum(['pending', 'assigned', 'in_progress', 'completed', 'rejected'])
  status?: string;

  @ApiPropertyOptional({ enum: ['none', 'low', 'medium', 'high'] })
  @IsOptional()
  @IsEnum(['none', 'low', 'medium', 'high'])
  priority?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  assignedTeam?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rejectionReason?: string;
}
