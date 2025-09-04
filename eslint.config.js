// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import stylistic from '@stylistic/eslint-plugin'; // 如果要用新版 stylistic 規則
import angularTemplateParser from '@angular-eslint/template-parser';

import pluginImport from 'eslint-plugin-import';

export default [
	{
		ignores: ['projects/**/*', '.git', 'node_modules/**/*', 'dist/**/*', '.env'], // 取代 ignorePatterns
	},

	// TypeScript 規則
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: ['tsconfig.json', 'e2e/tsconfig.json'],
				createDefaultProgram: true,
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			'@angular-eslint': angular,
			import: pluginImport,
			'@stylistic': stylistic,
		},
		processor: angularTemplate.processors['extract-inline-html'],
		rules: {
			'@angular-eslint/component-class-suffix': ['error', { suffixes: ['Page', 'Component'] }],
			'@angular-eslint/component-selector': [
				'error',
				{ type: 'element', prefix: 'app', style: 'kebab-case' },
			],
			'@angular-eslint/directive-selector': [
				'error',
				{ type: 'attribute', prefix: 'app', style: 'camelCase' },
			],

			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],

			'no-var': 'error',
			'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
			eqeqeq: ['error', 'smart'],
			curly: ['error', 'multi-line'],
			'object-shorthand': ['error', 'always'],

			'sort-imports': 'off',
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
						'type',
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'sort-imports': [
				'error',
				{
					ignoreCase: true,
					ignoreDeclarationSort: true,
					ignoreMemberSort: false,
				},
			],

			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@angular-eslint/no-empty-lifecycle-method': 'off',
			'@typescript-eslint/naming-convention': 'off',
			'@typescript-eslint/no-shadow': 'off',
			'@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
			'@stylistic/lines-between-class-members': [
				'error',
				'always',
				{ exceptAfterSingleLine: true, exceptAfterOverload: true },
			],
			'@typescript-eslint/member-ordering': [
				'warn',
				{
					default: [
						'public-static-field',
						'public-static-method',
						'protected-static-field',
						'protected-static-method',
						'private-static-field',
						'private-static-method',
						'public-instance-field',
						'protected-instance-field',
						'private-instance-field',
						'public-constructor',
						'protected-constructor',
						'private-constructor',
						'public-instance-method',
						'protected-instance-method',
						'private-instance-method',
					],
				},
			],
		},
	},

	// HTML 規則
	{
		files: ['**/*.html'],
		languageOptions: {
			parser: angularTemplateParser,
		},
		plugins: { '@angular-eslint/template': angularTemplate },
		rules: {
			...angularTemplate.configs.recommended.rules,
		},
	},
];
