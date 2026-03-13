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
exports.TeamsSeed = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const team_schema_1 = require("./schemas/team.schema");
let TeamsSeed = class TeamsSeed {
    teamModel;
    constructor(teamModel) {
        this.teamModel = teamModel;
    }
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
};
exports.TeamsSeed = TeamsSeed;
exports.TeamsSeed = TeamsSeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(team_schema_1.Team.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TeamsSeed);
//# sourceMappingURL=teams.seed.js.map