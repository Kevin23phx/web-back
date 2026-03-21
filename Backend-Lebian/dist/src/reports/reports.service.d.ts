import { Model } from 'mongoose';
import { ReportDocument } from './schemas/report.schema';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
export declare class ReportsService {
    private reportModel;
    private cloudinaryService;
    constructor(reportModel: Model<ReportDocument>, cloudinaryService: CloudinaryService);
    create(userId: string, createReportDto: CreateReportDto, files?: Express.Multer.File[]): Promise<ReportDocument>;
    findAll(query: any): Promise<ReportDocument[]>;
    findPublic(): Promise<ReportDocument[]>;
    findOne(id: string): Promise<ReportDocument>;
    update(id: string, updateReportDto: UpdateReportDto): Promise<ReportDocument>;
    findNearby(lat: number, lng: number, radiusKm: number): Promise<ReportDocument[]>;
    like(id: string, userId: string): Promise<ReportDocument | null>;
    incrementViews(id: string, userId: string): Promise<ReportDocument | null>;
    remove(id: string): Promise<ReportDocument | null>;
}
