module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
	},
	moduleNameMapper: {
		'\\.(css|scss|sass)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
	collectCoverageFrom: [
		'**/*.{ts,tsx}',
		'!**/*.test.{ts,tsx}',
		'!**/*.d.ts',
		'!jest.config.js',
		'!babel.config.js',
	],
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},
};
