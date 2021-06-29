import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'\\.(ts)$': 'ts-jest'
	},
	modulePaths: [
		'<rootDir>'
	],
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js',
		'jsx',
		'json',
		'node'
	],
	collectCoverage: true,
	coverageDirectory: '<rootDir>/coverage',
	collectCoverageFrom: [
		'src/**',
		'!src/modules/**/*.collection.ts',
		'!src/modules/**/*.validation.ts',
		'!src/**/*.snap'
	],
	coveragePathIgnorePatterns: [
		'index.ts',
		'src/core/repository',
		'./*.strategy.ts',
		'src/main.ts',
		'./*.module.ts',
		'/node_modules/',
		'/dist/',
		'/src/common/decorators',
		'/src/core/database',
		'/src/core/error',
		'/src/core/session',
		'/src/core/repositories/mongo',
		'/src/core/repositories/mysql'
	],
	coverageThreshold: {
		'global': {
			'branches': 90,
			'functions': 90,
			'lines': 90,
			'statements': 90
		}
	},
	globals: {
		'ts-jest': {
			'ignoreCoverageForDecorators': true,
			'ignoreCoverageForAllDecorators': true
		},
		'COVERALLS_SERVICE_NAME': 'jenkins',
		'COVERALLS_REPO_TOKEN': 'u4dAGxE61gvrfVgUxfRZGphhbLs1I9M1Q'
	},
	transformIgnorePatterns: [
		'../../node_modules/(?!${simple-git})'
	]
};
export default config;