import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AvatarsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAvatar(userId: number): import(".prisma/client").Prisma.Prisma__AvatarsClient<import(".prisma/client").Avatars, never>;
    setAvatar(imglink: string, user: User, userId: number): Promise<import(".prisma/client").Avatars>;
    deleteAvatar(userId: number): Promise<void>;
}
