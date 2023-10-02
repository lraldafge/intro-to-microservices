export default {
    port: process.env.PORT || 9000,
    nodeEnv: process.env.NODE_ENV || 'DEV',
    postgres: {
        databaseUrl: process.env.DATABASE_URL || ``,
    },
    funtecSecret: process.env.FUNTEC_SECRET || 'secret',
}