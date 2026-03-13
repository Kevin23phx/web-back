import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from './schemas/team.schema';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
  ) {}

  async findAll() {
    return this.teamModel.find().exec();
  }

  async findOne(id: string) {
    const team = await this.teamModel.findById(id).exec();
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async create(createTeamDto: CreateTeamDto) {
    const newTeam = new this.teamModel(createTeamDto);
    return newTeam.save();
  }

  async update(id: string, updateTeamDto: Partial<CreateTeamDto>) {
    const team = await this.teamModel
      .findByIdAndUpdate(id, updateTeamDto, { new: true })
      .exec();
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async remove(id: string) {
    const team = await this.teamModel.findByIdAndDelete(id).exec();
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async getStats() {
    const teams = await this.teamModel.find().exec();
    return {
      totalTeams: teams.length,
      activeTeams: teams.filter(t => t.isActive).length,
      totalMembers: teams.reduce((sum, t) => sum + t.membersCount, 0),
    };
  }
}

