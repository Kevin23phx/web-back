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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const report_schema_1 = require("../reports/schemas/report.schema");
const user_schema_1 = require("../users/schemas/user.schema");
let AdminService = class AdminService {
    reportModel;
    userModel;
    constructor(reportModel, userModel) {
        this.reportModel = reportModel;
        this.userModel = userModel;
    }
    async getStats() {
        const statusStats = await this.reportModel.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);
        const categoryStats = await this.reportModel.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);
        const totalReports = await this.reportModel.countDocuments();
        const totalUsers = await this.userModel.countDocuments();
        return {
            totalReports,
            totalUsers,
            byStatus: statusStats.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {}),
            byCategory: categoryStats.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {}),
        };
    }
    async getUsers() {
        const users = await this.userModel.aggregate([
            {
                $lookup: {
                    from: 'reports',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'reports',
                },
            },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    role: 1,
                    phone: 1,
                    isActive: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    reportsCount: { $size: '$reports' },
                },
            },
        ]);
        return users;
    }
    async updateUserRole(id, role) {
        const user = await this.userModel.findByIdAndUpdate(id, { role }, { new: true }).select('-password').exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async updateUser(id, updateData) {
        const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).select('-password').exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async removeUser(id) {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async cleanupUsers() {
        const allowedNames = ['sali', 'kevin', 'admin', 'equipe'];
        const result = await this.userModel.deleteMany({
            firstName: {
                $nin: allowedNames.map(name => new RegExp(`^${name}$`, 'i'))
            },
            role: { $ne: 'admin' }
        }).exec();
        return result;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(report_schema_1.Report.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map