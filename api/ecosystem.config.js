module.exports = {
    apps: [
        {
            name: 'api',
            script: './build/src/index.js',
            watch: true,
            instances: 4,
            exec_mode: 'cluster',
            max_restarts: 5,
            env: {
                PORT: 8000,
                NODE_ENV: 'development',
            },
            env_production: {
                PORT: 8000,
                NODE_ENV: 'production',
            },
        },
    ],
};
