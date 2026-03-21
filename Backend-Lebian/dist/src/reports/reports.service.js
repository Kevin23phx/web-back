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
const cloudinary_service_1 = require("../common/cloudinary/cloudinary.service");
let ReportsService = class ReportsService {
    reportModel;
    cloudinaryService;
    constructor(reportModel, cloudinaryService) {
        this.reportModel = reportModel;
        this.cloudinaryService = cloudinaryService;
    }
    async create(userId, createReportDto, files) {
        const { latitude, longitude, images: existingImages, ...rest } = createReportDto;
        const imageUrls = [];
        if (existingImages && existingImages.length > 0) {
            for (const img of existingImages) {
                if (img.startsWith('data:image')) {
                    try {
                        const upload = await this.cloudinaryService.uploadBase64(img);
                        if (upload.url) {
                            imageUrls.push(upload.url);
                        }
                    }
                    catch (error) {
                        console.error('Cloudinary Base64 upload failed:', error.message || error);
                        if (error.http_code) {
                            console.error('Cloudinary Error Code:', error.http_code);
                        }
                    }
                }
                else {
                    imageUrls.push(img);
                }
            }
        }
        if (files && files.length > 0) {
            for (const file of files) {
                try {
                    const upload = await this.cloudinaryService.uploadImage(file);
                    if (upload.url) {
                        imageUrls.push(upload.url);
                    }
                }
                catch (error) {
                    console.error('Cloudinary Multer upload failed:', error.message || error);
                }
            }
        }
        const locationInfo = latitude !== undefined && longitude !== undefined
            ? { type: 'Point', coordinates: [longitude, latitude] }
            : undefined;
        const createdReport = new this.reportModel({
            ...rest,
            userId,
            images: imageUrls,
            status: 'pending',
            priority: 'none',
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
            .find()
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
    async like(id, userId) {
        const report = await this.reportModel.findById(id).exec();
        if (!report)
            throw new common_1.NotFoundException('Report not found');
        if (report.likedBy.includes(userId)) {
            return report;
        }
        return this.reportModel
            .findByIdAndUpdate(id, {
            $inc: { likes: 1 },
            $addToSet: { likedBy: userId }
        }, { new: true })
            .exec();
    }
    async incrementViews(id, userId) {
        const report = await this.reportModel.findById(id).exec();
        if (!report)
            throw new common_1.NotFoundException('Report not found');
        if (report.viewedBy.includes(userId)) {
            return report;
        }
        return this.reportModel
            .findByIdAndUpdate(id, {
            $inc: { views: 1 },
            $addToSet: { viewedBy: userId }
        }, { new: true })
            .exec();
    }
    async remove(id) {
        const report = await this.reportModel.findByIdAndDelete(id).exec();
        if (!report) {
            throw new common_1.NotFoundException('Report not found');
        }
        return report;
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(report_schema_1.Report.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map