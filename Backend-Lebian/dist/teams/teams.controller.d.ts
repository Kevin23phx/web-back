import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/team.schema").TeamDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/team.schema").Team & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getStats(): Promise<{
        totalTeams: number;
        activeTeams: number;
        totalMembers: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/team.schema").TeamDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/team.schema").Team & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    create(createTeamDto: CreateTeamDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/team.schema").TeamDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/team.schema").Team & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateTeamDto: Partial<CreateTeamDto>): Promise<import("mongoose").Document<unknown, {}, import("./schemas/team.schema").TeamDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/team.schema").Team & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/team.schema").TeamDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/team.schema").Team & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
