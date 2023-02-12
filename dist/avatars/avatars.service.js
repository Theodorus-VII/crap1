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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AvatarsService = class AvatarsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAvatar(userId) {
        return this.prisma.avatars.findUnique({
            where: {
                userId
            }
        });
    }
    async setAvatar(imglink, user, userId) {
        const avatar = await this.prisma.avatars.create({
            data: {
                userId,
                imglink,
            },
        });
        return avatar;
    }
    async deleteAvatar(userId) {
        const avatar = this.prisma.avatars.findUnique({
            where: {
                userId
            }
        });
        if ((await avatar).userId == userId) {
            let temp = (await avatar).imglink;
            await this.prisma.avatars.delete({
                where: {
                    userId: userId
                }
            });
            return;
        }
        throw new common_1.ForbiddenException('Access to resource denied');
    }
};
AvatarsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AvatarsService);
exports.AvatarsService = AvatarsService;
//# sourceMappingURL=avatars.service.js.map