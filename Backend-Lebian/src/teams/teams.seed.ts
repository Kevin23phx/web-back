import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from './schemas/team.schema';

@Injectable()
export class TeamsSeed implements OnModuleInit {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.teamModel.countDocuments();
    if (count === 0) {
      await this.seed();
    }
  }

  async seed() {
    const teams = [
      {
        name: 'Équipe Centre',
        description: 'Chargée de la zone centrale et du centre-ville',
        category: ['plastic', 'glass'],
        membersCount: 8,
        isActive: true,
        assignedMissionsCount: 3,
      },
      {
        name: 'Équipe Nord',
        description: 'Intervient dans les quartiers nord et périphériques',
        category: ['organic', 'metal'],
        membersCount: 6,
        isActive: true,
        assignedMissionsCount: 2,
      },
      {
        name: 'Équipe Ouest',
        description: 'Spécialisée dans les interventions rapides zone ouest',
        category: ['other'],
        membersCount: 5,
        isActive: true,
        assignedMissionsCount: 0,
      },
    ];

    await this.teamModel.insertMany(teams);
    console.log('Teams seeded successfully');
  }
}

