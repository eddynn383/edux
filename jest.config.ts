import type { Config } from "jest";

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    // testMatch: ['./src/**/*.{spec,test}.{ts,tsx,js,jsx}'],
    // testPathIgnorePatterns: ["./.next/", "./node_modules/"],
    setupFilesAfterEnv: ["./src/setupTests.ts"],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(gif|ttf|eot|svg|png)$": "./test/__mocks__/fileMock.js",
    },
    transform: {
        '^.+\\.jsx?$': ['babel-jest', { presets: ['@babel/preset-env'] }],
    }
};

export default config;
