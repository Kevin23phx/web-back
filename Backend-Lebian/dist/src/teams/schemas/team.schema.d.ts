import { Document } from 'mongoose';
export type TeamDocument = Team & Document;
export declare class Team {
    name: string;
    description: string;
    category: string[];
    membersCount: number;
    isActive: boolean;
    assignedMissionsCount: number;
}
export declare const TeamSchema: import("mongoose").Schema<Team, import("mongoose").Model<Team, any, any, any, (Document<unknown, any, Team, any, import("mongoose").DefaultSchemaOptions> & Team & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Team, any, import("mongoose").DefaultSchemaOptions> & Team & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Team>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Team, Document<unknown, {}, Team, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Team & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Team, Document<unknown, {}, Team, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Team, Document<unknown, {}, Team, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string[], Team, Document<unknown, {}, Team, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    membersCount?: import("mongoose").SchemaDefinitionProperty<number, Team, Document<unknown, {}, Team, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Team, Document<unknown, {}, Team, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    assignedMissionsCount?: import("mongoose").SchemaDefinitionProperty<number, Team, Document<unknown, {}, Team, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Team>;
