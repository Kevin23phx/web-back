import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
export type ReportDocument = Report & Document;
export declare class Report {
    userId: string | User;
    title: string;
    description: string;
    category: string;
    otherCategoryDescription?: string;
    images: string[];
    location?: {
        type: string;
        coordinates: number[];
    };
    address?: string;
    status: string;
    priority: string;
    assignedTeam?: string;
    rejectionReason?: string;
    likes: number;
    likedBy: string[];
    views: number;
    viewedBy: string[];
}
export declare const ReportSchema: MongooseSchema<Report, import("mongoose").Model<Report, any, any, any, (Document<unknown, any, Report, any, import("mongoose").DefaultSchemaOptions> & Report & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Report, any, import("mongoose").DefaultSchemaOptions> & Report & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Report>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Report, Document<unknown, {}, Report, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<string | User, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    otherCategoryDescription?: import("mongoose").SchemaDefinitionProperty<string | undefined, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    images?: import("mongoose").SchemaDefinitionProperty<string[], Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<{
        type: string;
        coordinates: number[];
    } | undefined, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string | undefined, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    priority?: import("mongoose").SchemaDefinitionProperty<string, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    assignedTeam?: import("mongoose").SchemaDefinitionProperty<string | undefined, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    rejectionReason?: import("mongoose").SchemaDefinitionProperty<string | undefined, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    likes?: import("mongoose").SchemaDefinitionProperty<number, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    likedBy?: import("mongoose").SchemaDefinitionProperty<string[], Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    views?: import("mongoose").SchemaDefinitionProperty<number, Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    viewedBy?: import("mongoose").SchemaDefinitionProperty<string[], Report, Document<unknown, {}, Report, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Report>;
