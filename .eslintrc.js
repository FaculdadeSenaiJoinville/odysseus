module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'@hapi/eslint-plugin-hapi'
	],
	extends: [
		'plugin:@typescript-eslint/recommended'
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: [
		'.eslintrc.js'
	],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'quotes': ["error", "single", { "allowTemplateLiterals": true, "avoidEscape": true }],
		'indent': ["error", "tab"],
		'@hapi/hapi/scope-start': ['error']
	},
};
