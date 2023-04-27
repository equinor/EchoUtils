module.exports = {
    coveragePathIgnorePatterns: [
        'src/types/*',
        'src/index.ts',
        'src/hooks/index.ts',
        'src/utils/index.ts',
        'src/hooks/useNavigatorOnline.ts'
    ],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!<rootDir>/node_modules/'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            lines: 90,
            statements: 90
        }
    },
    testEnvironment: 'jsdom',
    setupFiles: ['./src/utils/deviceInfo/tests/testSetup.ts']
};
