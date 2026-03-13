import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    create(req: any, createReportDto: CreateReportDto): Promise<import("./schemas/report.schema").ReportDocument>;
    findAll(query: any): Promise<import("./schemas/report.schema").ReportDocument[]>;
    findPublic(): Promise<import("./schemas/report.schema").ReportDocument[]>;
    findNearby(lat: number, lng: number, radius?: number): Promise<import("./schemas/report.schema").ReportDocument[]>;
    findOne(id: string): Promise<import("./schemas/report.schema").ReportDocument>;
    update(id: string, updateReportDto: UpdateReportDto): Promise<import("./schemas/report.schema").ReportDocument>;
    like(id: string): Promise<import("./schemas/report.schema").ReportDocument | null>;
}
