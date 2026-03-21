import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { TeamDocument } from './schemas/team.schema';
export declare class TeamsSeed implements OnModuleInit {
    private teamModel;
    constructor(teamModel: Model<TeamDocument>);
    onModuleInit(): Promise<void>;
    seed(): Promise<void>;
}
