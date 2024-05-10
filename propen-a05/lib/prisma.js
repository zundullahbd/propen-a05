"use strict";
var _a;
exports.__esModule = true;
exports.db = void 0;
var client_1 = require("@prisma/client");
var globalForPrisma = globalThis;
var prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient();
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;
exports.db = prisma;