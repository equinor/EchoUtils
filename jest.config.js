module.exports = {
    coveragePathIgnorePatterns: ['src/types/*', 'src/index.ts'],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!<rootDir>/node_modules/'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            lines: 90,
            statements: 90
        }
    }
};
