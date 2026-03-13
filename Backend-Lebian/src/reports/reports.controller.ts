import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'Create a new report' })
  async create(@Req() req: any, @Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(req.user.userId, createReportDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all reports' })
  async findAll(@Query() query: any) {
    return this.reportsService.findAll(query);
  }

  @Get('public')
  @ApiOperation({ summary: 'List public reports (not pending)' })
  async findPublic() {
    return this.reportsService.findPublic();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Find reports near a location' })
  async findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number = 5,
  ) {
    return this.reportsService.findNearby(
      Number(lat),
      Number(lng),
      Number(radius),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report details' })
  async findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update report status (Admin only)' })
  async update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Post(':id/like')
  @ApiOperation({ summary: 'Like a report' })
  async like(@Param('id') id: string) {
    return this.reportsService.like(id);
  }

  @Patch(':id/views')
  @ApiOperation({ summary: 'Increment report views' })
  async incrementViews(@Param('id') id: string) {
    return this.reportsService.incrementViews(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete report (Admin only)' })
  async remove(@Param('id') id: string) {
    return this.reportsService.remove(id);
  }
}
