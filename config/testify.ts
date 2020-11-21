/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const chalk = require('chalk');
const rimraf = require('rimraf');

const testFiles = [
	{
		name: 'Clock',
		master: './src/app/components/Clock/Clock.tsx',
		test: './src/app/components/Clock/TEST-Clock.tsx'
	},
	{
		name: 'Counter',
		master: './src/app/containers/Counter/Counter.tsx',
		test: './src/app/containers/Counter/TEST-Counter.tsx'
	},
	{
		name: 'Form',
		master: './src/app/containers/Form/Form.tsx',
		test: './src/app/containers/Form/TEST-Form.tsx'
	},
	{
		name: 'Todo',
		master: './src/app/containers/Todo/Todo.tsx',
		test: 'src/app/containers/Todo/TEST-Todo.tsx'
	},
	{
		name: 'createActions',
		master: './src/app/store/actions/createActions.ts',
		test: './src/app/store/actions/TEST-createActions.ts'
	},
	{
		name: 'reducers',
		master: './src/app/store/reducers/reducers.ts',
		test: './src/app/store/reducers/TEST-reducer.ts'
	}
];

interface ITestFiles {
	name: string;
	master: string;
	test: string;
}

testFiles.map((file: ITestFiles) => {
	const { master, test, name } = file;
	fs.unlink(master, (err: string) => {
		if (err) return console.error(err);

		fs.rename(test, master, (err: string) => {
			if (err) console.error(err);
			return console.log(`${chalk.green(`✓ Updated: `)}${name}`);
		});
	});
});

rimraf('node_modules', (err: string) => {
	if (err) return console.error(err);
	return console.log(`${chalk.green(`✓ Removed:`)} node_modules`);
});
