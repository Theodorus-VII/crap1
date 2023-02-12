import { AvatarsService } from './avatars.service';
import { User } from '@prisma/client';
export declare const storage: {
    storage: any;
};
export declare class AvatarsController {
    private avatarsService;
    constructor(avatarsService: AvatarsService);
    getAvatar(user: User, res: any): Promise<import("rxjs").Observable<any> | "data not found">;
    setAvatar(user: User, file: any): Promise<{
        imagePath: any;
    }>;
    updateAvatar(user: User, file: any): Promise<{
        imagePath: any;
    }>;
    deleteAvatar(user: User): Promise<void>;
}
