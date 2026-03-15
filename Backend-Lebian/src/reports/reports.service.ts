import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from './schemas/report.schema';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
  ) {}

  async create(
    userId: string,
    createReportDto: CreateReportDto,
  ): Promise<ReportDocument> {
    const { latitude, longitude, images, ...rest } = createReportDto;

    const locationInfo =
      latitude !== undefined && longitude !== undefined
        ? { type: 'Point', coordinates: [longitude, latitude] }
        : undefined;

    const createdReport = new this.reportModel({
      ...rest,
      userId,
      images: images || [],
      ...(locationInfo && { location: locationInfo }),
    });

    return createdReport.save();
  }

  async findAll(query: any): Promise<ReportDocument[]> {
    const filters: any = {};
    if (query.status) filters.status = query.status;
    if (query.category) filters.category = query.category;
    if (query.userId) filters.userId = query.userId;

    return this.reportModel
      .find(filters)
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findPublic(): Promise<ReportDocument[]> {
    // Retourne tous les signalements (modifié selon demande pour visibilité globale)
    return this.reportModel
      .find()
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<ReportDocument> {
    const report = await this.reportModel
      .findById(id)
      .populate('userId', 'firstName lastName email')
      .exec();
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  async update(
    id: string,
    updateReportDto: UpdateReportDto,
  ): Promise<ReportDocument> {
    const updatedReport = await this.reportModel
      .findByIdAndUpdate(id, updateReportDto, { new: true })
      .exec();
    if (!updatedReport) {
      throw new NotFoundException('Report not found');
    }
    return updatedReport;
  }

  async findNearby(
    lat: number,
    lng: number,
    radiusKm: number,
  ): Promise<ReportDocument[]> {
    return this.reportModel
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
            $maxDistance: radiusKm * 1000,
          },
        },
      })
      .exec();
  }

  async like(id: string, userId: string): Promise<ReportDocument | null> {
    const report = await this.reportModel.findById(id).exec();
    if (!report) throw new NotFoundException('Report not found');

    if (report.likedBy.includes(userId)) {
      return report; // Already liked
    }

    return this.reportModel
      .findByIdAndUpdate(
        id,
        { 
          $inc: { likes: 1 },
          $addToSet: { likedBy: userId } 
        },
        { new: true },
      )
      .exec();
  }

  async incrementViews(id: string, userId: string): Promise<ReportDocument | null> {
    const report = await this.reportModel.findById(id).exec();
    if (!report) throw new NotFoundException('Report not found');

    if (report.viewedBy.includes(userId)) {
      return report; // Already viewed
    }

    return this.reportModel
      .findByIdAndUpdate(
        id,
        { 
          $inc: { views: 1 },
          $addToSet: { viewedBy: userId } 
        },
        { new: true },
      )
      .exec();
  }

  async remove(id: string): Promise<ReportDocument | null> {
    const report = await this.reportModel.findByIdAndDelete(id).exec();
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }
}
