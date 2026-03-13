import { Model } from 'mongoose';
import { Team, TeamDocument } from './schemas/team.schema';
import { CreateTeamDto } from './dto/create-team.dto';
export declare class TeamsService {
    private teamModel;
    constructor(teamModel: Model<TeamDocument>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, TeamDocument, {}, import("mongoose").DefaultSchemaOptions> & Team & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, TeamDocument, {}, import("mongoose").DefaultSchemaOptions> & Team & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    create(createTeamDto: CreateTeamDto): Promise<import("mongoose").Document<unknown, {}, TeamDocument, {}, import("mongoose").DefaultSchemaOptions> & Team & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateTeamDto: Partial<CreateTeamDto>): Promise<import("mongoose").Document<unknown, {}, TeamDocument, {}, import("mongoose").DefaultSchemaOptions> & Team & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, TeamDocument, {}, import("mongoose").DefaultSchemaOptions> & Team & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getStats(): Promise<{
        totalTeams: number;
        activeTeams: number;
        totalMembers: number;
    }>;
}
