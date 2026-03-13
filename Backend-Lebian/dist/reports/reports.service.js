"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const report_schema_1 = require("./schemas/report.schema");
let ReportsService = class ReportsService {
    reportModel;
    constructor(reportModel) {
        this.reportModel = reportModel;
    }
    async create(userId, createReportDto) {
        const { latitude, longitude, images, ...rest } = createReportDto;
        const locationInfo = latitude !== undefined && longitude !== undefined
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
    async findAll(query) {
        const filters = {};
        if (query.status)
            filters.status = query.status;
        if (query.category)
            filters.category = query.category;
        if (query.userId)
            filters.userId = query.userId;
        return this.reportModel
            .find(filters)
            .populate('userId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findPublic() {
        return this.reportModel
            .find({ status: { $ne: 'pending' } })
            .populate('userId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findOne(id) {
        const report = await this.reportModel
            .findById(id)
            .populate('userId', 'firstName lastName email')
            .exec();
        if (!report) {
            throw new common_1.NotFoundException('Report not found');
        }
        return report;
    }
    async update(id, updateReportDto) {
        const updatedReport = await this.reportModel
            .findByIdAndUpdate(id, updateReportDto, { new: true })
            .exec();
        if (!updatedReport) {
            throw new common_1.NotFoundException('Report not found');
        }
        return updatedReport;
    }
    async findNearby(lat, lng, radiusKm) {
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
    async like(id) {
        return this.reportModel
            .findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
            .exec();
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(report_schema_1.Report.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReportsService);
//# sourceMappingURL=reports.service.js.map