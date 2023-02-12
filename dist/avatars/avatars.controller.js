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
exports.AvatarsController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const platform_express_1 = require("@nestjs/platform-express");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const avatars_service_1 = require("./avatars.service");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const route_params_decorator_1 = require("@nestjs/common/decorators/http/route-params.decorator");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: 'uploads',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        }
    })
};
let AvatarsController = class AvatarsController {
    constructor(avatarsService) {
        this.avatarsService = avatarsService;
    }
    async getAvatar(user, res) {
        let userId = user.id;
        const x = this.avatarsService.getAvatar(userId);
        try {
            const ret = (await x).imglink;
            return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), 'uploads/' + ret)));
        }
        catch (error) {
            return ("data not found");
        }
    }
    async setAvatar(user, file) {
        console.log(user.id);
        let userId = user.id;
        console.log(userId);
        const fname = file.filename;
        this.avatarsService.setAvatar(fname, user, userId);
        return ({ imagePath: file.filename });
    }
    async updateAvatar(user, file) {
        let userId = user.id;
        console.log(userId);
        const x = this.avatarsService.getAvatar(userId);
        const uid = ((await x).userId);
        this.avatarsService.deleteAvatar(uid);
        console.log(user.id);
        userId = user.id;
        console.log(userId);
        const fname = file.filename;
        this.avatarsService.setAvatar(fname, user, userId);
        return ({ imagePath: file.filename });
    }
    async deleteAvatar(user) {
        let userId = user.id;
        const x = this.avatarsService.getAvatar(userId);
        const uid = ((await x).userId);
        this.avatarsService.deleteAvatar(uid);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AvatarsController.prototype, "getAvatar", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', exports.storage)),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, route_params_decorator_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AvatarsController.prototype, "setAvatar", null);
__decorate([
    (0, common_1.Patch)(),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', exports.storage)),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, route_params_decorator_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AvatarsController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AvatarsController.prototype, "deleteAvatar", null);
AvatarsController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('avatars'),
    __metadata("design:paramtypes", [avatars_service_1.AvatarsService])
], AvatarsController);
exports.AvatarsController = AvatarsController;
//# sourceMappingURL=avatars.controller.js.map