import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
    // Prevents TS from complaining about global prisma during hot-reloads in development
    var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;