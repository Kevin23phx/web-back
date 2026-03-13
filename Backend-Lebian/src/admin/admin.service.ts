import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from '../reports/schemas/report.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

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

  async updateUserRole(id: string, role: string) {
    const user = await this.userModel.findByIdAndUpdate(id, { role }, { new: true }).select('-password').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: string, updateData: any) {
    const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).select('-password').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async removeUser(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async cleanupUsers() {
    // Keep only Sali, Kevin, Admin, Equipe (case insensitive match on firstName)
    const allowedNames = ['sali', 'kevin', 'admin', 'equipe'];
    const result = await this.userModel.deleteMany({
      firstName: { 
        $nin: allowedNames.map(name => new RegExp(`^${name}$`, 'i')) 
      },
      role: { $ne: 'admin' } // Safety check: don't delete admins even if not in list, unless specifically asked? 
      // User said "except 4 such as Sali, Kevin, Admin and Equipe".
    }).exec();
    return result;
  }
}
