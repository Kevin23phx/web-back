import { Model } from 'mongoose';
import { ReportDocument } from './schemas/report.schema';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportsService {
    private reportModel;
    constructor(reportModel: Model<ReportDocument>);
    create(userId: string, createReportDto: CreateReportDto): Promise<ReportDocument>;
    findAll(query: any): Promise<ReportDocument[]>;
    findPublic(): Promise<ReportDocument[]>;
    findOne(id: string): Promise<ReportDocument>;
    update(id: string, updateReportDto: UpdateReportDto): Promise<ReportDocument>;
    findNearby(lat: number, lng: number, radiusKm: number): Promise<ReportDocument[]>;
    like(id: string): Promise<ReportDocument | null>;
}
