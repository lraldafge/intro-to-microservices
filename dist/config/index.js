"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbPrefix = process.env.NODE_ENV === 'PROD' ? 'prod_' : 'dev_';
exports.default = {
    port: process.env.PORT || 9000,
    postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || 5432,
        dbName: dbPrefix + (process.env.POSTGRES_DATABASE || 'test'),
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
    },
    funtecSecret: process.env.FUNTEC_SECRET || 'secret',
};
